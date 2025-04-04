const Contacts = require('../../models/contact');
const Chats = require('../../models/chat');
const {ERROR_MESSAGE} = require('../../utils/propertyResolver');
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`,
});

const CreateContact = async (contactDetails) => {
    try {
        // const {name, email, phone, message} = contactDetails;
        const result = await Contacts.create(contactDetails);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

const FeatchAllContacts = async () => {
    try {
        const result = await Contacts.findAll();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

const FetchLatestContacts = async () => {
    try {
      const result = await Contacts.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']], // latest first
      });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  

module.exports = {
    CreateContact,
    FeatchAllContacts,
    FetchLatestContacts,
}