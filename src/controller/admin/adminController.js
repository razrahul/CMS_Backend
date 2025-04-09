const adminService = require("../../service/admin/adminServices");
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../utils/propertyResolver");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");

const getAllRoles = async (req, res) => {
  try {
    const result = await adminService.FindAllRoles();
    sendSuccessResponse(res, SUCCESS_MESSAGE.ROLES_FETCHED, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const getAllRolesActive = async (req, res) => {
  try {
    const result = await adminService.FindAllRolesActive();
    sendSuccessResponse(res, SUCCESS_MESSAGE.ROLES_FETCHED, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};



const getAllCompaanys = async (req, res) => {
  try {
    const result = await adminService.FindSAllCompanys();
    sendSuccessResponse(res, SUCCESS_MESSAGE.COMPANYS_FETCHED, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const updateROleActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await adminService.chnageRoleActivity(id);
    sendSuccessResponse(res, SUCCESS_MESSAGE.ROLE_ACTIVITY_UPDATED, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const getAllCompaanysActive = async (req, res) => {
  try {
    const result = await adminService.FindAllCompanysActive();
    sendSuccessResponse(res, SUCCESS_MESSAGE.COMPANYS_FETCHED, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const updateCompaanysActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await adminService.chnageCompanyActivity(id);
        sendSuccessResponse(res, SUCCESS_MESSAGE.COMPANY_ACTIVITY_UPDATED, result, 200);
    } catch (error) {
        sendErrorResponse(
        res,
        error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
        "",
        500
        );
    }
    };


module.exports = {
  getAllRoles,
  getAllRolesActive,
  getAllCompaanys,
  getAllCompaanysActive,
  updateROleActivity,
  updateCompaanysActivity
};
