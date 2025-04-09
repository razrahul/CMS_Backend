const express = require('express');
const authRouter = require('./auth');
const contactRouter = require("./contact");
const chatRouter = require("./chat");
const adminRouter = require("./admin");


const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/contact', contactRouter);
indexRouter.use('/chat', chatRouter);
indexRouter.use('/admin', adminRouter);




module.exports = indexRouter;