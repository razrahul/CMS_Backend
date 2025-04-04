const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect"); // Adjust the path to your database configuration

const Chats = require("./chat");

const BaseModel = require("./baseModel");


const Contacts = sequelize.define(
  "Contacts",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      lowercase: true,
      trim: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      trim: true,
    },
    nationlity: {
      type: DataTypes.STRING,
      allowNull: true,
      trim: true,
    },
    status: {
      type: DataTypes.STRING,
      enum: ["request","proccess", "complete", "make a call"], // Define the allowed values for the status field
      defaultValue: "request", // Set the default value for the status field
      allowNull: false,
      trim: true,
    },
    chat: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model : "chats",
        key : "uuId"
      }
    },

    ...BaseModel.rawAttributes,
    
  },
  {
    tableName: "contacts",
  }
);

module.exports = Contacts;
