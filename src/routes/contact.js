const express = require('express');
const contactController = require('../controller/contact/contactController');


const router = express.Router();

router.post('/create', contactController.Conatctcreate); 



module.exports = router;