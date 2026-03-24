const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
require('dotenv').config();

/**
 * Middleware: Verify JWT access token from HttpOnly cookie
 * Attaches decoded user payload to req.user
 */
async function verifyToken(req, res, next) {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
      code: 'NO_TOKEN',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired.',
        code: 'TOKEN_EXPIRED',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid token.',
      code: 'INVALID_TOKEN',
    });
  }
}

/**
 * Middleware: Check if user has one of the required roles
 * Must be used AFTER verifyToken
 */
function checkRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. No roles assigned.',
        code: 'NO_ROLES',
      });
    }

    const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required roles: ${allowedRoles.join(', ')}`,
        code: 'INSUFFICIENT_ROLE',
      });
    }

    next();
  };
}

module.exports = { verifyToken, checkRole };
