const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect"); // Adjust the path to your database configuration

const Chats = require("./chat");
const ContactLogs = require("./contactLog");

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
      enum: ["request","replyed","make a call", "complete" ], // Define the allowed values for the status field
      defaultValue: "request", // Set the default value for the status field
      allowNull: false,
      // trim: true,
    },
    chat: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model : "chats",
        key : "uuId"
      }
    },
    makeACall: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      validate: {
        isDate: true,
      },
    },

    ...BaseModel.rawAttributes,
    
  },
  {
    tableName: "contacts",
  }
);

function getChangedFields(prev, current) {
  const changed = [];
  for (let key in current) {
    if (
      key !== "updatedAt" && key !== "createdAt" &&
      JSON.stringify(prev[key]) !== JSON.stringify(current[key])
    ) {
      changed.push(key);
    }
  }
  return changed;
}

Contacts.addHook("afterCreate", async (contact, options) => {
  await ContactLogs.create({
    contactId: contact.uuId,
    action: "create",
    changedFields: Object.keys(contact.toJSON()),
    newData: contact.toJSON(),
    performedBy: options.userId || null,
    ipAddress: options.ip || null,
    userAgent: options.userAgent || null,
  });
});

Contacts.addHook("beforeUpdate", async (contact, options) => {
  const previous = contact._previousDataValues;
  const current = contact.dataValues;

  await ContactLogs.create({
    contactId: contact.uuId,
    action: "update",
    changedFields: getChangedFields(previous, current),
    previousData: previous,
    newData: current,
    performedBy: options.userId || null,
    ipAddress: options.ip || null,
    userAgent: options.userAgent || null,
  });
});

Contacts.addHook("beforeDestroy", async (contact, options) => {
  await ContactLogs.create({
    contactId: contact.uuId,
    action: "delete",
    previousData: contact.toJSON(),
    performedBy: options.userId || null,
    ipAddress: options.ip || null,
    userAgent: options.userAgent || null,
  });
});


module.exports = Contacts;
