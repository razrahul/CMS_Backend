const contactService = require("../../service/contact/contactService");
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../utils/propertyResolver");

const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");

const statsService = require("../../service/stats/statsServices");


const Conatctcreate = async (req, res) => {
  try {
    const result = await contactService.CreateContact(req.body);
    if (result){
      await statsService.updateReached();
    }
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

const statusChangeConatct = async (req, res) => {
  try {
    const {id } = req.params;
    const { status } = req.body;
    const result = await contactService.StatusChange(id, status);
    sendSuccessResponse(res, SUCCESS_MESSAGE.CONTACT_STATUS_CHANGED, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
}

const changeActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await contactService.activity(id);
    sendSuccessResponse(res, SUCCESS_MESSAGE.CONTACT_ACTIVITY_CHANGED, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
}

const makeACallSateUs = async (req, res ) => {
  try {
    const {id} = req.params;
    const {date} = req.body;

    const result = await contactService.makeCallSateus(id, date, req.user);
    sendSuccessResponse(res, SUCCESS_MESSAGE.CONTACT_CALL_STATUS_CHANGED, result, 200);
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
  statusChangeConatct,
  changeActivity,
  makeACallSateUs,
};
