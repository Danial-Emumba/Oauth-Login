const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");
const { PROVIDERS } = require("../util/constants");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isRequiredIfDirectProvider(value) {
          if (this.provider === PROVIDERS.DIRECT && !value) {
            throw new Error("Password is required for direct provider");
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
