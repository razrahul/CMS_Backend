const express = require('express');
const contactController = require('../controller/contact/contactController');
const { authenticateToken, isAuthorizeAdmin, authorize } = require('../middlewares/authMiddleware');


const router = express.Router();

router.post('/create', contactController.Conatctcreate); 
router.get('/', contactController.featchAllContacts);
router.get('/latest',authenticateToken,authorize(['Admin', "SuperAdmin"]), contactController.fetchLatestContacts);
router.put('/status/:id', contactController.statusChangeConatct);
router.put('/activity/:id', contactController.changeActivity);



module.exports = router;