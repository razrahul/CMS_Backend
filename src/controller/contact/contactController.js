const contactService = require("../../service/contact/contactService");
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../utils/propertyResolver");

const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");


const Conatctcreate = async (req, res) => {
  try {
    const result = await contactService.CreateContact(req.body);
    sendSuccessResponse(res, SUCCESS_MESSAGE.CONTACT_CREATED, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const featchAllContacts = async (req, res) => {
  try {
    const result = await contactService.FeatchAllContacts();
    sendSuccessResponse(res, SUCCESS_MESSAGE.CONTACT_FETCHED, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
}

const fetchLatestContacts = async (req, res) => {
  try {
    const result = await contactService.FetchLatestContacts();
    sendSuccessResponse(res, SUCCESS_MESSAGE.CONTACT_FETCHED, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
}

module.exports = {
  Conatctcreate,
  featchAllContacts,
  fetchLatestContacts,
};
