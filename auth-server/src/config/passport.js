const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User, Role } = require('../models');

// ─── Local Strategy ───────────────────────────────────────────
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: { email: email.toLowerCase() },
          include: [{ model: Role, as: 'roles', attributes: ['name'] }],
        });

        if (!user) {
          return done(null, false, { message: 'Invalid email or password.' });
        }

        if (!user.password) {
          return done(null, false, {
            message: 'This account uses Google sign-in. Please use Google to log in.',
          });
        }

        const isValid = await user.validatePassword(password);
        if (!isValid) {
          return done(null, false, { message: 'Invalid email or password.' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// ─── Google OAuth2 Strategy ───────────────────────────────────
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== 'your_google_client_id') {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ where: { googleId: profile.id } });

          if (!user) {
            // Check if user with same email exists
            user = await User.findOne({
              where: { email: profile.emails[0].value },
            });

            if (user) {
              // Link Google account to existing user
              user.googleId = profile.id;
              user.avatar = profile.photos?.[0]?.value || user.avatar;
              await user.save();
            } else {
              // Create new user
              user = await User.create({
                email: profile.emails[0].value,
                name: profile.displayName,
                googleId: profile.id,
                avatar: profile.photos?.[0]?.value,
              });

              // Assign default 'User' role
              const defaultRole = await Role.findOne({ where: { name: 'User' } });
              if (defaultRole) {
                await user.addRole(defaultRole);
              }
            }
          }

          // Reload with roles
          user = await User.findByPk(user.id, {
            include: [{ model: Role, as: 'roles', attributes: ['name'] }],
          });

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}

// Serialization (not used with JWT but needed for passport init)
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id, {
      include: [{ model: Role, as: 'roles', attributes: ['name'] }],
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
