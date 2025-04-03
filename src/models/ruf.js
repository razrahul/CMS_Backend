const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const BaseModel = require("./baseModel");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  ...BaseModel.rawAttributes,  // ✅ BaseModel ke sare fields inherit ho jayenge
}, {
  tableName: "users",  // ✅ Explicitly setting table name
});

module.exports = User;
