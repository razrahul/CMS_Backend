const { DataTypes, ENUM, Model } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path to your database configuration

const Chat = require("./chat");

const BaseModel = require("./baseModel");


const Contact = sequelize.define(
  "Contact",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    nationlity: {
      type: DataTypes.STRING,
      allowNull: true,
      trim: true,
    },
    status: {
      type: DataTypes.STRING,
      enum: ["request","process", "complete", "make a call"], // Define the allowed values for the status field
      defaultValue: "request", // Set the default value for the status field
      allowNull: false,
      trim: true,
    },
    chat: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model : Chat,
        key : "uuId"
      }
    },

    ...BaseModel.rawAttributes,
    
  },
  {
    tableName: "contacts",
  }
);

module.exports = Contact;
