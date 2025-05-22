const Chats = require("../../models/chat");
const Contacts = require("../../models/contact");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const sendMail = require("../mail/mailService");
const moment = require("moment"); // Make sure moment is installed

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

const replyToMessage = async (id, replyDetails, user) => {
  try {
    const { message } = replyDetails;

    const chat = await Chats.findOne({ where: { uuId: id } });

    if (!chat) {
      throw new Error(ERROR_MESSAGE.CHAT_NOT_FOUND);
    }

    let existingSenders;

    if (Array.isArray(chat.sender)) {
      console.log("array");
      
      existingSenders = chat.sender;
    } else if (typeof chat.sender === "string") {
      try {
        existingSenders = JSON.parse(chat.sender);
        if (!Array.isArray(existingSenders)) existingSenders = [];
      } catch (e) {
        existingSenders = [];
      }
    } else {
      existingSenders = [];
    }

    existingSenders.push(message);

    chat.sender = existingSenders;
    chat.updatedBy = user?.uuId;
    await chat.save();

    const contact = await Contacts.findOne({ where: { chat: chat.uuId } });
    if (!contact) {
      throw new Error(ERROR_MESSAGE.CONTACT_NOT_FOUND);
    }

    // Format createdAt
    const formattedDate = moment(chat.updatedAt).format("dddd, MMMM Do YYYY, h:mm A");

    // Prepare email content
    const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>New Message from CMS</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
          color: #333;
        }
        .container {
          max-width: 600px;
          background-color: #fff;
          margin: auto;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #673ab7;
          padding: 15px;
          color: white;
          text-align: center;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .content {
          padding: 20px;
        }
        .footer {
          font-size: 14px;
          color: #888;
          text-align: center;
          margin-top: 20px;
        }
        .message-box {
          background-color: #f1f1f1;
          padding: 15px;
          border-left: 4px solid #673ab7;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>You've received a new message</h2>
        </div>
        <div class="content">
          <p>Hello ${contact.name},</p>
          <p>You have received a new message from our team:</p>
          <div class="message-box">
            <p>${message}</p>
          </div>
          <p><strong>Sent At:</strong> ${formattedDate}</p>
          <p>If you have any questions, feel free to reply to this message.</p>
        </div>
        <div class="footer">
          <p>This is an automated message from CMS App.</p>
        </div>
      </div>
    </body>
    </html>
    `;

    await sendMail(contact.email, "New Message from CMS App", emailHtml);

    return {
      uuId: id,
      sender: chat.sender,
      updated: true,
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