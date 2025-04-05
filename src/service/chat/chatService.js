const Chats = require("../../models/chat");
const Contacts = require("../../models/contact");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const CreateChat = async (id, chatDetails) => {
  try {
    // for update conatct chat id
    const contact = await Contacts.findOne({ where: { uuId: id } });
    if (!contact) {
      throw new Error(ERROR_MESSAGE.CONTACT_NOT_FOUND);
    }
    
    // for creating a chat, we need to find the contact by id
    const { request, message, createdBy } = chatDetails;
    const result = await Chats.create({
        requester: request,
        sender: message,
        contact: id,
        createdBy:createdBy,
    });

    // update the contact with chat id
    contact.chat = result.uuId;
    await contact.save();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const  replyToMessage = async (id, replyDetails) => {
  try {
    const { message } = replyDetails;
    const [affectedRows ] = await Chats.update({
     sender:message,
    },
    {
        where: { uuId: id },
    });
    if (affectedRows === 0) {
        throw new Error(ERROR_MESSAGE.CHAT_NOT_UPDATE);
    }
    return {
        uuId: id,
        sender: message,
        updated: affectedRows,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};


const Activity = async (id) => {
  try {
    const chat = await Chats.findOne({ where: { uuId: id } });
    if (!chat) {
      throw new Error(ERROR_MESSAGE.CHAT_NOT_FOUND);
    }
    chat.isActive = !chat.isActive;
    await chat.save();
    return chat;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
    CreateChat,
    replyToMessage,
    Activity,
}