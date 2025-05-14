const express = require('express');
const router = express.Router();
const leaderboard = require('../controllers/leaderboardController');

router.get('/top', leaderboard.getTopPlayers);
router.post('/update', leaderboard.updateScore);

module.exports = router;
