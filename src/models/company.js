const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const BaseModel = require("./baseModel");

const Companys = sequelize.define(
  "Companys",
  {
    id: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
      // autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    compayId: {
      type: DataTypes.TEXT,
    },
    liveUrl: {
      type: DataTypes.STRING,
      // allowNull: false,
    },

    ...BaseModel.rawAttributes,
    
  },
  {
    tableName: "Companys",
  }
);

module.exports = Companys;
