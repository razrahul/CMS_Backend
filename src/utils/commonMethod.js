const Roles =  require("../models/role");
const Users = require("../models/user");
const Companys = require("../models/company");

const tableSync = async () => {
  try {
    await Roles.sync({ force: false });
    await Companys.sync({ force: false }); 
    await Users.sync({ force: false });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { tableSync };
