const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const BaseModel = sequelize.define(
  "BaseModel",
  {
    uuId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true, // ✅ Automatically adds createdAt & updatedAt
    paranoid: true, // ✅ Enables soft delete with deletedAt column
    freezeTableName: true, // ✅ Prevents Sequelize from pluralizing table name
  }
);

module.exports = BaseModel;
