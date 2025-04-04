const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");


const BaseModel = require("./baseModel");

const Chats = sequelize.define(
  "Chats",
  {
    id: {
      type: DataTypes.INTEGER,
      // autoIncrement: true,
    },
    requester: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    
    ...BaseModel.rawAttributes,
  },
  {
    tableName: "chats",
  }
);

module.exports = Chats;