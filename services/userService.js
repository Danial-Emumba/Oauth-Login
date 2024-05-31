const User = require("../models/user");

const CREATE_USER = async (user) => {
  const existingUser = await GetUserByEmail(user.email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  return await User.create(user);
};

const GetUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  CREATE_USER,
};
