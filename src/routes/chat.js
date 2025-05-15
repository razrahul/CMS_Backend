const express = require('express');
const {ChatCreate, ChatReply, ChnageActivity} = require('../controller/chat/chatController');

const { authenticateToken, isAuthorizeAdmin, authorize } = require('../middlewares/authMiddleware');


const router = express.Router();

router.post("/create/:id", ChatCreate);
router.post("/reply/:id",authenticateToken, ChatReply);
router.put("/activity/:id", ChnageActivity);


module.exports = router;