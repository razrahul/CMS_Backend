const statsService = require('../../service/stats/statsServices');
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require('../../utils/propertyResolver');

const {
  sendSuccessResponse,
  sendErrorResponse,
} = require('../../utils/response');

// Create or update today's visitors in your route:
const createVisitors = async (req, res) => {
  try {
    const result = await statsService.increasevisitors();
    sendSuccessResponse(res, SUCCESS_MESSAGE.VISITOR_INCREASE, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

//get today’s stats
const getTodayStats = async (req, res) => {
  try {
    const result = await statsService.fetchTodayStats();
    sendSuccessResponse(res, SUCCESS_MESSAGE.FEATCH_STATS, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

//get week’s stats
const getWeekStats = async (req, res) => {
  try {
    const result = await statsService.fetchWeekStats();
    sendSuccessResponse(res, SUCCESS_MESSAGE.FEATCH_STATS, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

// Fetch all stats date-wise
const getAllStats = async (req, res) => {
    try {
      const result = await statsService.fetchAllStats();
      sendSuccessResponse(res, SUCCESS_MESSAGE.FEATCH_STATS, result, 200);
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
    createVisitors,
    getAllStats,
    getTodayStats,
    getWeekStats,
};