const db = require('../db');
const redis = require('../db/redis');

const getTopPlayers = async (req, res) => {
  const { scope = 'daily', region = 'global' } = req.query;
  const key = `leaderboard:${scope}:${region}`;
  const top = await redis.zRangeWithScores(key, -10, -1, { REV: true });

  const enriched = await Promise.all(
    top.map(async ({ value: userId, score }) => {
      const result = await db.query('SELECT username FROM users WHERE id = $1', [userId]);
      return { username: result.rows[0]?.username, score, userId };
    })
  );

  res.json(enriched);
};

const updateScore = async (req, res) => {
  const { userId, score, scope = 'daily', region = 'global' } = req.body;
  const key = `leaderboard:${scope}:${region}`;

  await redis.zIncrBy(key, score, userId);
  await db.query(
    'INSERT INTO scores (id, user_id, score, scope) VALUES (gen_random_uuid(), $1, $2, $3)',
    [userId, score, scope]
  );

  res.json({ message: 'Score updated' });
};

module.exports = { getTopPlayers, updateScore };
