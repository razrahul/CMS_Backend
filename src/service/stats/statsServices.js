const Stats = require('../../models/stats'); // Adjust the path as necessary
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");
const { Op } = require('sequelize');
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`,
});

//find to today's date in YYYY-MM-DD format
const getsToday = () => new Date().toISOString().split('T')[0];

const increasevisitors = async () => {
    try {
        const today = getsToday();
        const [stats, created] = await Stats.findOrCreate({
            where: { date: today },
            defaults: { visitors: 0, respondents: 0, reached: 0 },
         });

         stats.visitors += 1;
         await stats.save();

         return stats;
        
    } catch (error) {
        throw new Error(error.message);
        
    }
};

//featch today's stats
const fetchTodayStats = async () => {
    try {
        const today = getsToday();
        const [stats, created] = await Stats.findOrCreate({
            where: { date: today },
            defaults: { visitors: 0, respondents: 0, reached: 0 },
        });
        return stats;
    } catch (error) {
        throw new Error(error.message);
    }
};

// featch all stats date wise
const fetchAllStats = async () => {
    try {
        const allStats = await Stats.findAll({
            order: [['date', 'DESC']],
        });
        return allStats;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateRespondents = async () => {
    try {
        const today = getsToday();
        const [stats] = await Stats.findOrCreate({ where: { date: today } });
        stats.respondents += 1;
        await stats.save();

        return stats;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateReached = async () => {
    try {
        const today = getsToday();
        const [stats] = await Stats.findOrCreate({ where: { date: today } });
        stats.reached += 1;
        await stats.save();

        return stats;
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = {
    increasevisitors,
    fetchAllStats,
    updateRespondents,
    updateReached,
    fetchTodayStats,
};


//2. Create or update today’s stats in your route:
// const express = require('express');
// const router = express.Router();
// const Stats = require('../models/stats');
// const { Op } = require('sequelize');

// Get today's date in YYYY-MM-DD format
// const getToday = () => new Date().toISOString().split('T')[0];

// Increment visitors
// router.post('/stats/visit', async (req, res) => {
//   const today = getToday();

//   try {
//     const [stats, created] = await Stats.findOrCreate({
//       where: { date: today },
//     });

//     stats.visitors += 1;
//     await stats.save();

//     res.json({ message: 'Visitor count updated', data: stats });
//   } catch (err) {
//     console.error('Error updating visitor count:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// Similarly, create endpoints for respondents and reached if needed

// 3. Fetch data date-wise:
// router.get('/stats', async (req, res) => {
//     try {
//       const allStats = await Stats.findAll({
//         order: [['date', 'DESC']],
//       });
  
//       res.json(allStats);
//     } catch (err) {
//       console.error('Error fetching stats:', err);
//       res.status(500).json({ error: 'Failed to fetch stats' });
//     }
//   });

  
//   ///Example: Controller me respondents update karna
//   const Stats = require('../models/stats');

// // Helper to get today's date (YYYY-MM-DD)
// const getToday = () => new Date().toISOString().split('T')[0];

// // Reply controller
// const sendReply = async (req, res) => {
//   try {
//     const { message, contactId } = req.body;

//     // 1. Yahan pe aapka actual reply logic hoga
//     // e.g., Save to DB, send email, etc.
//     // await ContactReply.create({ contactId, message });

//     // 2. Stats update
//     const today = getToday();
//     const [stats] = await Stats.findOrCreate({ where: { date: today } });
//     stats.respondents += 1;
//     await stats.save();

//     res.status(200).json({ message: 'Reply sent and respondents count updated' });
//   } catch (error) {
//     console.error('Error in sendReply:', error);
//     res.status(500).json({ error: 'Failed to send reply' });
//   }
// };

// module.exports = { sendReply };

