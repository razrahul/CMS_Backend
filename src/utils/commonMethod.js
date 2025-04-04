const Roles =  require("../models/role");
const Users = require("../models/user");
const Companys = require("../models/company");
const Chats = require("../models/chat");
const Contactc = require("../models/contact");

const tableSync = async () => {
  try {
    await Roles.sync({ force: false });
    await Companys.sync({ force: false }); 
    await Users.sync({ force: false });
    await Chats.sync({ force: false });
    await Contactc.sync({ force: false });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { tableSync };
