const express = require('express');

const { createVisitors, getTodayStats, getAllStats, getWeekStats}  = require('../controller/stats/statsController');
const { authenticateToken, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/visit', createVisitors);

router.get('/today',authenticateToken, authorize(["SuperAdmin", "Admin"]), getTodayStats);

//week stats
router.get('/week',authenticateToken, getWeekStats);

router.get('/all',authenticateToken, authorize(["SuperAdmin", "Admin"]), getAllStats);


module.exports = router;