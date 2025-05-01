const express = require('express');
const authRouter = require('./auth');
const contactRouter = require("./contact");
const chatRouter = require("./chat");
const adminRouter = require("./admin");
const statsRouter = require("./stats");


const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/contact', contactRouter);
indexRouter.use('/chat', chatRouter);
indexRouter.use('/admin', adminRouter);
indexRouter.use('/stats', statsRouter);




module.exports = indexRouter;