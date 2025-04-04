const express = require('express');
const contactController = require('../controller/contact/contactController');


const router = express.Router();

router.post('/create', contactController.Conatctcreate); 
router.get('/', contactController.featchAllContacts);
router.get('/latest', contactController.fetchLatestContacts);



module.exports = router;