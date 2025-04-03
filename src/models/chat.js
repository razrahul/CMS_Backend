const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const Conatct = require("./contact");

const BaseModel = require("./baseModel");

const Chat = sequelize.define(
  "Chat",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    requester: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: Conatct,
            key: "uuId",
        }
    },
    ...BaseModel.rawAttributes,
  },
  {
    tableName: "chats",
  }
);

module.exports = Chat;