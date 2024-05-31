const User = require("../models/user");

const createUser = async (user) => {
  const existingUser = await GetUserByEmail(user.email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  return await User.create(user);
};

const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  createUser,
  getUserByEmail,
};
