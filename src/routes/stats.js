const express = require('express');

const { createVisitors, getTodayStats, getAllStats}  = require('../controller/stats/statsController');

const router = express.Router();

router.post('/visit', createVisitors);

router.get('/today', getTodayStats);

router.get('/all', getAllStats);


module.exports = router;