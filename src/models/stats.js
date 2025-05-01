const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const BaseModel = require("./baseModel");

const Stats = sequelize.define(
  "Stats",
  {
    id: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
      // autoIncrement: true,
    },
    date: {
        type: DataTypes.DATEONLY, // YYYY-MM-DD format
        allowNull: false,
        unique: true, // one entry per day
    },
    visitors: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    respondents: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    reached: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ...BaseModel.rawAttributes,
  },
  {
    tableName: "stats",
  }
);

module.exports = Stats;
