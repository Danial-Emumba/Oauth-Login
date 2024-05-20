// initialize env
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const passport = require("./config/passport-config");
const sequelize = require("./config/sequelize-config");
require("./models/associations");
const jwt = require("jsonwebtoken");
const { authenticationMiddleware } = require("./middleware/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

// Protect API routes with JWT authentication
app.use("/api", authenticationMiddleware);

// Example API route that requires authentication
app.get("/api/protected", (req, res) => {
  res.json({ message: "This is a protected route" });
});

// Generate JWT token
app.post("/api/generate-token", (req, res) => {
  const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Error while creating tables: ", err);
  });
