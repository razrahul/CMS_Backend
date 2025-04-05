const { ERROR_MESSAGE } = require("../utils/propertyResolver");
const { sendErrorResponse } = require("../utils/response");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const authenticateToken = async (req, res, next) => {
  //token get
  const authHeader = req.headers["authorization"];

  // Extract token from 'Bearer token'
  const token = authHeader && authHeader.split(" ")[1];

  // Check if token is present
  if (!token) {
    return sendErrorResponse(res, ERROR_MESSAGE.TOKEN_REQUIRED, "", 400);
  }
  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.isActive) {
      return sendErrorResponse(res, ERROR_MESSAGE.USER_NOT_ACTIVE, "", 400);
    }
    console.log(decoded, "decoded token");
    
    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    return sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      400
    );
  }
};


module.exports = authenticateToken;