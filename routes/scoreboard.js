const express = require('express');
const router = express.Router();
const db = require('../db'); // Database connection

// Example route for fetching data
router.get('/scoreboard', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM scoreboard');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;