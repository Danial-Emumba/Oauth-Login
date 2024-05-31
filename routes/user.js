const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const { CreateUser } = require("../services/user_service");

router.post("/signup", async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    const newUser = await CreateUser({
      email,
      firstName,
      lastName,
      password,
    });
    res.json({ success: true, user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Could not register user" });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.json({ success: true, user: req.user });
      });
    })(req, res, next);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error during login" });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ success: true });
});

module.exports = router;
