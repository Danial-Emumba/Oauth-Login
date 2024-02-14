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
  },
  {
    sequelize,
    modelName: "Provider",
  }
);

module.exports = Provider;
