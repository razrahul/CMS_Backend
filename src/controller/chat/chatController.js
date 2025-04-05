const chatService = require("../../service/chat/chatService");
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../utils/propertyResolver");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");

const ChatCreate = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await chatService.CreateChat(id, req.body);
    sendSuccessResponse(res, SUCCESS_MESSAGE.CHAT_CREATED, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const ChatReply = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await chatService.replyToMessage(id, req.body);
    sendSuccessResponse(res, SUCCESS_MESSAGE.CHAT_REPLAY, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const ChnageActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await chatService.Activity(id);
    sendSuccessResponse(res, SUCCESS_MESSAGE.CHAT_ACTIVITY, result, 200);
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
  ChatCreate,
    ChatReply,
    ChnageActivity,
};
