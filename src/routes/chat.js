const express = require('express');
const {ChatCreate, ChatReply, ChnageActivity} = require('../controller/chat/chatController');


const router = express.Router();

router.post("/create/:id", ChatCreate);
router.put("/reply/:id", ChatReply);
router.put("/activity/:id", ChnageActivity);


module.exports = router;