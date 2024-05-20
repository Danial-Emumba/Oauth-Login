const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { Strategy } = require("passport-openidconnect");
const User = require("../models/user");
const { updateOrSaveUser } = require("../services/");
const { PROVIDERS } = require("../util/constants");

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  User.findOne({ where: { email: user.email } })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await updateOrSaveUser(
          profile,
          PROVIDERS.GOOGLE,
          accessToken,
          refreshToken
        );
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "oidc",
  new Strategy(
    {
      issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`,
      authorizationURL: `https://${process.env.OKTA_DOMAIN}/oauth2/default/v1/authorize`,
      tokenURL: `https://${process.env.OKTA_DOMAIN}/oauth2/default/v1/token`,
      userInfoURL: `https://${process.env.OKTA_DOMAIN}/oauth2/default/v1/userinfo`,
      clientID: process.env.OKTA_CLIENT_ID,
      clientSecret: process.env.OKTA_CLIENT_SECRET,
      callbackURL: "/auth/okta/callback",
      scope: "openid profile email",
    },
    async (issuer, profile, done) => {
      try {
        const user = await updateOrSaveUser(
          profile,
          PROVIDERS.OKTA,
          accessToken,
          refreshToken
        );
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
module.exports = passport;
