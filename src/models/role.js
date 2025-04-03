const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const BaseModel = require("./baseModel");

const Roles = sequelize.define(
  "Roles",
  {
    id: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
      // autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(55),
      unique: true,
      allowNull: false,
    },

    ...BaseModel.rawAttributes,
    
  },
  {
    tableName: "roles",
  }
);

module.exports = Roles;
