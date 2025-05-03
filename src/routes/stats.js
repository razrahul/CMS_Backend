const express = require('express');

const { createVisitors, getTodayStats, getAllStats, getWeekStats}  = require('../controller/stats/statsController');

const router = express.Router();

router.post('/visit', createVisitors);

router.get('/today', getTodayStats);

//week stats
router.get('/week', getWeekStats);

router.get('/all', getAllStats);


module.exports = router;