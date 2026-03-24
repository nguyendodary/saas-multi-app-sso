const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
const { verifyToken } = require('../middleware/auth');
const {
  generateAccessToken,
  generateRefreshToken,
  setTokenCookies,
  clearTokenCookies,
} = require('../utils/token');

const router = express.Router();

// ─── POST /register ───────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
      });
    }

    const existing = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    const user = await User.create({
      email: email.toLowerCase(),
      password,
      name,
    });

    // Assign default 'User' role
    const defaultRole = await Role.findOne({ where: { name: 'User' } });
    if (defaultRole) {
      await user.addRole(defaultRole);
    }

    // Reload with roles
    const fullUser = await User.findByPk(user.id, {
      include: [{ model: Role, as: 'roles', attributes: ['name'] }],
    });

    const accessToken = generateAccessToken(fullUser);
    const refreshToken = generateRefreshToken(fullUser);
    setTokenCookies(res, accessToken, refreshToken);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      user: fullUser.toSafeJSON(),
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// ─── POST /login ──────────────────────────────────────────────
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info?.message || 'Invalid credentials.',
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    setTokenCookies(res, accessToken, refreshToken);

    return res.json({
      success: true,
      message: 'Login successful.',
      user: user.toSafeJSON(),
    });
  })(req, res, next);
});

// ─── POST /logout ─────────────────────────────────────────────
router.post('/logout', (req, res) => {
  clearTokenCookies(res);
  return res.json({ success: true, message: 'Logged out successfully.' });
});

// ─── POST /refresh ────────────────────────────────────────────
router.post('/refresh', async (req, res) => {
  const token = req.cookies?.refresh_token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No refresh token provided.',
      code: 'NO_REFRESH_TOKEN',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findByPk(decoded.id, {
      include: [{ model: Role, as: 'roles', attributes: ['name'] }],
    });

    if (!user) {
      clearTokenCookies(res);
      return res.status(401).json({
        success: false,
        message: 'User not found.',
      });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    setTokenCookies(res, newAccessToken, newRefreshToken);

    return res.json({
      success: true,
      message: 'Token refreshed.',
      user: user.toSafeJSON(),
    });
  } catch (err) {
    clearTokenCookies(res);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired refresh token.',
      code: 'INVALID_REFRESH_TOKEN',
    });
  }
});

// ─── GET /me ──────────────────────────────────────────────────
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Role, as: 'roles', attributes: ['name'] }],
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.json({
      success: true,
      user: user.toSafeJSON(),
    });
  } catch (err) {
    console.error('Get me error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// ─── GET /google ──────────────────────────────────────────────
router.get(
  '/google',
  (req, res, next) => {
    // Store the redirect URL from query param
    if (req.query.redirect) {
      req.session = req.session || {};
      res.cookie('oauth_redirect', req.query.redirect, {
        httpOnly: true,
        maxAge: 5 * 60 * 1000,
      });
    }
    next();
  },
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

// ─── GET /google/callback ─────────────────────────────────────
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const accessToken = generateAccessToken(req.user);
    const refreshToken = generateRefreshToken(req.user);
    setTokenCookies(res, accessToken, refreshToken);

    // Redirect to the original app or default to TaskFlow
    const redirectUrl =
      req.cookies?.oauth_redirect || process.env.CLIENT_TASKFLOW_URL || 'http://localhost:3000';
    res.clearCookie('oauth_redirect');
    res.redirect(redirectUrl);
  }
);

module.exports = router;
