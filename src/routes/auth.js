const express = require('express');
const authController = require('../controller/auth/index');
const { authenticateToken , isAuthorizeAdmin, authorize} = require('../middlewares/authMiddleware');


const authRouter = express.Router();

authRouter.post("/register", authController.registerUser);
authRouter.get("/verify-account/:token", authController.verifyAccount);
authRouter.post("/login", authController.loginUser);
authRouter.get("/users",authenticateToken, authorize(["SuperAdmin", "Admin"]), authController.getAllUsers);


module.exports = authRouter;