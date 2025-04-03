const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const Roles = require("./role");
const Company = require("./company");
const BaseModel = require("./baseModel");

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      // autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    dob: {
      type: DataTypes.DATE,
    },
    verifyAccountToken: {
      type: DataTypes.STRING,
    },
    verifyAccountExpires: {
      type: DataTypes.DATE,
    },
    // reset_password_token: {
    //   type: DataTypes.STRING,
    // },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Roles,
        key: "uuId",
      },
    },
    company: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Company,
        key: "uuId",
      },
    },

    ...BaseModel.rawAttributes,
  },
  {
    tableName: "Users",
  }
);

module.exports = Users;
