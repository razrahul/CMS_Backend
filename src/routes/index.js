const express = require('express');
const authRouter = require('./auth');
const contactRouter = require("./contact");


const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/contact', contactRouter);




module.exports = indexRouter;