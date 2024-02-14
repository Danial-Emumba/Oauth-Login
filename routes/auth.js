const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/success",
    failureRedirect: "/login",
  })
);

router.get(
  "/okta",
  passport.authenticate("oidc", { scope: ["profile", "email"] })
);

router.get(
  "/okta/callback",
  passport.authenticate("oidc", {
    successRedirect: "/auth/success",
    failureRedirect: "/login",
  })
);

router.get("/success", (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ user: req.user });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
