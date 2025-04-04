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
        throw error;
    }
}

module.exports = {
    CreateContact
}