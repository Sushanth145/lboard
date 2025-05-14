const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const leaderboardRoutes = require('./routes/leaderboardRoutes');
app.use('/leaderboard', leaderboardRoutes);

module.exports = app;
