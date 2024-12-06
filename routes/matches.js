const express = require('express');
const router = express.Router();
const db = require('../db'); // Database connection

// Route to fetch all rows from the players table
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM matches;');
    res.json(rows); // Respond with the retrieved rows
  } catch (err) {
    console.error('Error while querying the database:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/', async (req, res) => {
    const { datePlayed, winnerId, winnerName, wonAgainst } = req.body; // Extract data from the request body
  
    try {
      const result = await db.query(
        'INSERT INTO matches (date_time_played, winner_id, winner_name, won_against) VALUES ($1, $2, $3, $4) RETURNING *;',
        [datePlayed, winnerId, winnerName, wonAgainst]
      );
      res.status(201).json(result.rows[0]); // Respond with the inserted row
    } catch (err) {
      console.error('Error while inserting into the database:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  module.exports = router;