// initialize env
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const passport = require("./config/passport-config");
const sequelize = require("./config/sequelize-config");
require("./models/associations");

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
