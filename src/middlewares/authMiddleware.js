const { ERROR_MESSAGE } = require("../utils/propertyResolver");
const { sendErrorResponse } = require("../utils/response");
const Roles = require("./../models/role");
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
    return sendErrorResponse(res, ERROR_MESSAGE.TOKEN_REQUIRED, "", 400);   //TOKEN_REQUIRED = "Login to user"
  }
  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded, "decoded token");
    if (!decoded.isActive) {
      return sendErrorResponse(res, ERROR_MESSAGE.USER_NOT_ACTIVE, "", 400);
    }
    // console.log(decoded, "decoded token");
    
    // Attach user information to the request object
    req.user = decoded;
    // console.log(req.user, "req.user");
    
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

const isAuthorizeAdmin = async (req, res, next) => {
  // Check if the user has the required role
  
  const role = await Roles.findOne({ where: { uuId: req.user.role } });
  // console.log(role, "@@@@@role");
  if (!role || role.name !== "superAdmin") {
    return sendErrorResponse(res, ERROR_MESSAGE.UNAUTHORIZED_SUPERADMIN, "", 400);
  }
  next();
}; 

// const authorize = (roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return sendErrorResponse(res, ERROR_MESSAGE.UNAUTHORIZED, "", 400);
//     }
//     next();
//   };
// };



//multiple roles authorization
const authorize = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userRole = await Roles.findOne({ where: { uuId: req.user.role } });

      if (!userRole || !allowedRoles.includes(userRole.name)) {
        return sendErrorResponse(res, ERROR_MESSAGE.UNAUTHORIZED_SUPERADMIN, "", 400);
      }

      next();
    } catch (error) {
      return sendErrorResponse(res, ERROR_MESSAGE.SOMETHING_WENT_WRONG, error.message, 500);
    }
  };
};



module.exports = {
  authenticateToken,
  isAuthorizeAdmin,
  authorize,
  // authorize,
};
