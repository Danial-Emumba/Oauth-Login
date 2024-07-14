const User = require("../models/user");

async function createUser(data) {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, data) {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.update(data);
    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  await user.destroy();
  return user;
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
