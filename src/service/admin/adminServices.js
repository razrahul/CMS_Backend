const Roles = require("../../models/role");
const Companys = require("../../models/company");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const FindAllRoles = async () => {
  try {
    const roles = await Roles.findAll();

    return roles;
  } catch (error) {
    throw new Error(error.message);
  }
};

const FindAllRolesActive = async () => {
  try {
    const roles = await Roles.findAll({
      where: {
        isActive: true,
      },
    });

    return roles;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findRoleById = async (id) => {
  try {
    const role = await Roles.findOne({
      where: {
        uuId: id,
        active: true,
      },
    });
    if (!role) {
      throw new Error(ERROR_MESSAGE.ROLE_NOT_FOUND);
    }

    return role;
  } catch (error) {
    throw new Error(error.message);
  }
};

const chnageRoleActivity = async (id) => {
  try {
    const role = await Roles.findOne({
      where: {
        uuId: id,
      },
    });
    if (!role) {
      throw new Error(ERROR_MESSAGE.ROLE_NOT_FOUND);
    }

    role.isActive = !role.isActive; // Toggle the isActive status
    await role.save();

    return role;
  } catch (error) {
    throw new Error(error.message);
  }
};

const FindSAllCompanys = async () => {
  try {
    const companys = await Companys.findAll();

    return companys;
  } catch (error) {
    throw new Error(error.message);
  }
};

const FindAllCompanysActive = async () => {
  try {
    const companys = await Companys.findAll({
      where: {
        isActive: true,
      },
    });

    return companys;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findCompanyById = async (id) => {
  try {
    const company = await Companys.findOne({
      where: {
        uuId: id,
        active: true,
      },
    });
    if (!company) {
      throw new Error(ERROR_MESSAGE.COMPANY_NOT_FOUND);
    }

    return company;
  } catch (error) {
    throw new Error(error.message);
  }
};

const chnageCompanyActivity = async (id) => {
  try {
    const company = await Companys.findOne({
      where: {
        uuId: id,
      },
    });
    if (!company) {
      throw new Error(ERROR_MESSAGE.COMPANY_NOT_FOUND);
    }

    company.isActive = !company.isActive; // Toggle the isActive status
    await company.save();

    return company;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  FindAllRoles,
  FindAllRolesActive,
  findRoleById,
  chnageRoleActivity,
  FindSAllCompanys,
  FindAllCompanysActive,
  findCompanyById,
  chnageCompanyActivity,
};
