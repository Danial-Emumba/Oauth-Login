const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

const Provider = sequelize.define(
  "Provider",
  {
    type: {
      type: DataTypes.ENUM("google", "okta"),
      allowNull: false,
    },
    providerId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Provider",
  }
);

module.exports = Provider;
