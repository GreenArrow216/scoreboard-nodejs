const express = require('express');
const router = express.Router();
const db = require('../db'); // Database connection

// Route to fetch all rows from the board table
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM board;');
    res.json(rows); // Respond with the retrieved rows
  } catch (err) {
    console.error('Error while querying the database:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;