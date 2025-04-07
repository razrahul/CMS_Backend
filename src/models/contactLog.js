const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const ContactLogs = sequelize.define(
  "ContactLogs",
  {
    uuId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    contactId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    action: {
      type: DataTypes.ENUM("create", "update", "delete"),
      allowNull: false,
    },
    changedFields: {
        type: DataTypes.TEXT, // Use TEXT instead of ARRAY
        allowNull: true,
        get() {
          const rawValue = this.getDataValue("changedFields");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue("changedFields", JSON.stringify(value || []));
        },
    },
    previousData: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    newData: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    performedBy: {
      type: DataTypes.INTEGER, // admin/user ID
      allowNull: true,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "contactLogs",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = ContactLogs;
