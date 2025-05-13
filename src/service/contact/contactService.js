const Contacts = require("../../models/contact");
const Chats = require("../../models/chat");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");
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
      order: [["createdAt", "DESC"]], // latest first
      include: [
        {
          model: Chats,
          as: "chatData",
          attributes: ["uuId","requester", "sender", "createdAt"],
        },
      ],
    });
    return result;
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
    return  { uuId:id,
        status,
        isActive,
        updated: affectedRows,};
  } catch (error) {
    throw new Error(error.message);
  }
};

const activity = async (id) => {
  try {
   
    const conatct = await Contacts.findOne({where: {uuId: id}});

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

const makeCallSateus = async (id, date, user) => {
  try {
    console.log(user.uuId, "user");
    
    const [affectedRows] = await Contacts.update(
      {
        makeACall: date,
        updatedBy: user.uuId,
      },
      {
        where: { uuId: id },
      }
    );
    if (affectedRows === 0) {
      throw new Error(ERROR_MESSAGE.CONTACT_NOT_UPDATE);
    }
    return { uuId: id, date, updated: affectedRows };
  } catch (error) {
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
