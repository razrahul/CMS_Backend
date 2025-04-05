const express = require('express');
const authRouter = require('./auth');
const contactRouter = require("./contact");
const chatRouter = require("./chat");


const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/contact', contactRouter);
indexRouter.use('/chat', chatRouter);




module.exports = indexRouter;