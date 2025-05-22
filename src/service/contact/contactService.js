const Contacts = require("../../models/contact");
const Chats = require("../../models/chat");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const sendMail = require("../mail/mailService");
const moment = require("moment"); // Make sure moment is installed

const CreateContact = async (contactDetails) => {
  try {
    // const {name, email, phone, message} = contactDetails;
    const result = await Contacts.create(contactDetails);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const FeatchAllContacts = async () => {
  try {
    const result = await Contacts.findAll();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const FetchLatestContacts = async () => {
  try {
    const result = await Contacts.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Chats,
          as: "chatData",
          attributes: ["uuId", "requester", "sender", "createdAt", "updatedAt", "updatedBy"],
        },
      ],
    });

    const formatted = result.map((item) => {
      const data = item.toJSON();

      if (typeof data.chatData?.sender === "string") {
        try {
          data.chatData.sender = JSON.parse(data.chatData.sender);
        } catch (e) {
          // Keep as-is if not valid JSON
        }
      }

      return data;
    });

    return formatted;
  } catch (error) {
    throw new Error(error.message);
  }
};

const StatusChange = async (id, status) => {
  try {
    const isActive = status !== "request"; // true ya false
    const [affectedRows] = await Contacts.update(
      {
        status,
        isActive,
      },
      {
        where: { uuId: id },
      }
    );
    if (affectedRows === 0) {
      throw new Error(ERROR_MESSAGE.CONTACT_NOT_UPDATE);
    }
    return { uuId: id, status, isActive, updated: affectedRows };
  } catch (error) {
    throw new Error(error.message);
  }
};

const activity = async (id) => {
  try {
    const conatct = await Contacts.findOne({ where: { uuId: id } });

    if (!conatct) {
      throw new Error(ERROR_MESSAGE.CONTACT_NOT_FOUND);
    }

    conatct.isActive = !conatct.isActive; // Toggle the isActive status
    await conatct.save(); // Save the updated status to the database

    return conatct; // Return the updated contact
  } catch (error) {
    throw new Error(error.message);
  }
};

// const makeCallSateus = async (id, date, user) => {
//   try {
//     console.log(user.uuId, "user");

//     const [affectedRows] = await Contacts.update(
//       {
//         makeACall: date,
//         updatedBy: user.uuId,
//       },
//       {
//         where: { uuId: id },
//       }
//     );
//     if (affectedRows === 0) {
//       throw new Error(ERROR_MESSAGE.CONTACT_NOT_UPDATE);
//     }
//     return { uuId: id, date, updated: affectedRows };
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

const makeCallSateus = async (id, date, user) => {
  try {
    const contact = await Contacts.findOne({ where: { uuId: id } });

    if (!contact) {
      throw new Error(ERROR_MESSAGE.CONTACT_NOT_FOUND);
    }

    // Update fields
    contact.makeACall = date || contact.makeACall;
    contact.updatedBy = user.uuId || contact.updatedBy;

    await contact.save(); // This will persist changes to the DB

    const formattedDate = moment(contact.makeACall).format("dddd, MMMM Do YYYY, h:mm A");

    const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Scheduled Call</title>
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
          background-color: #2196F3;
          padding: 15px;
          color: white;
          text-align: center;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .content {
          padding: 20px;
          text-align: center;
        }
        .footer {
          font-size: 14px;
          color: #888;
          text-align: center;
          margin-top: 20px;
        }
        .button {
          background-color: #2196F3;
          color: white;
          padding: 10px 25px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        }
        @media only screen and (max-width: 600px) {
          .container {
            width: 100%;
            padding: 10px;
          }
          .button {
            padding: 8px 18px;
            font-size: 14px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Call Scheduled</h2>
        </div>
        <div class="content">
          <p>Hello ${contact.name},</p>
          <p>We have successfully scheduled a call with you.</p>
          <p><strong>Call Date & Time:</strong></p>
          <p style="font-size: 18px; color: #2196F3;">${formattedDate}</p>
          <p>If you have any questions or need to reschedule, feel free to reach out.</p>
          <a href="mailto:support@cms-app.com" class="button">Contact Support</a>  
        </div>
        <div class="footer">
          <p>This is an automated message from CMS App.</p>
        </div>
      </div>
    </body>
    </html>
    `;
    // TODO: replace with actual email sending logic
    await sendMail(contact.email, "Call Scheduled with CMS App", emailHtml);

    return { uuId: contact.uuId, date: contact.makeACall, updated: 1 };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};


module.exports = {
  CreateContact,
  FeatchAllContacts,
  FetchLatestContacts,
  StatusChange,
  activity,
  makeCallSateus,
};
