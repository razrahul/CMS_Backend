const express = require('express');
const authController = require('../controller/auth/index');



const authRouter = express.Router();

authRouter.post("/register", authController.registerUser);
authRouter.get("/verify-account/:token", authController.verifyAccount);
authRouter.post("/login", authController.loginUser);


module.exports = authRouter;