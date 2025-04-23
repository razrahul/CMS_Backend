const authService = require("../../service/auth/authService");
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../utils/propertyResolver");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const registerUser = async (req, res) => {
  try {
    const { password} = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    //Generate Token
    const accountToken = uuidv4();
    const accountTokenExpiry = Date.now() + (24*3600000); // token valid for 24 hour


    const userInfo = await authService.saveUser({
      ...req.body,
      password: hashPassword,
      verifyAccountToken: accountToken,
      verifyAccountExpires: accountTokenExpiry,
    });

    sendSuccessResponse(res, SUCCESS_MESSAGE.USER_CREATED, userInfo, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const verifyAccount = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      throw new Error(ERROR_MESSAGE.INVALID_TOKEN);
    }
    const result = await authService.verifyAccountUser(token);
    sendSuccessResponse(res, SUCCESS_MESSAGE.ACCOUNT_VERIFIED, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password, rememberPassword } = req.body;
    const result = await authService.loginUser(
      email,
      password,
      rememberPassword
    );
    sendSuccessResponse(res, SUCCESS_MESSAGE.USER_LOGIN, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await authService.getAllUsers();
    sendSuccessResponse(res, SUCCESS_MESSAGE.USER_LIST, result, 200);
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
    registerUser,
    verifyAccount,
    loginUser,
    getAllUsers,
}
