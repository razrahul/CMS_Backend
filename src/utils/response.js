const sendSuccessResponse = (res, message, data={}, statuscode = 200) => {
  res.status(statuscode).json({
    success: true,
    message,
    data,
  });
}



const sendErrorResponse = (res, message, error={}, statuscode = 500) => {
  res.status(statuscode).json({
    success: false,
    message,
    error,
  });
}


module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
};