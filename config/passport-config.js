const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { Strategy } = require("passport-openidconnect");
const User = require("../models/user");
const { updateOrSaveUser } = require("../util/");
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
        const user = await updateOrSaveUser(profile, PROVIDERS.GOOGLE);
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
        const user = await updateOrSaveUser(profile, PROVIDERS.OKTA);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = passport;
