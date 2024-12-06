const express = require('express');
const router = express.Router();
const db = require('../db'); // Database connection

// Route to fetch all rows from the players table
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM players;');
    res.json(rows); // Respond with the retrieved rows
  } catch (err) {
    console.error('Error while querying the database:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/', async (req, res) => {
  const { name, score } = req.body; // Extract data from the request body

  try {
    const result = await db.query(
      'INSERT INTO players (name) VALUES ($1) RETURNING *;',
      [name, score]
    );
    res.status(201).json(result.rows[0]); // Respond with the inserted row
  } catch (err) {
    console.error('Error while inserting into the database:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params; // Extract ID from URL parameters
  const { name } = req.body; // Extract data from the request body

  try {
    const result = await db.query(
      'UPDATE players SET name = $1 WHERE id = $3 RETURNING *;',
      [name, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Record not found' }); // Handle case where no rows were updated
    }

    res.json(result.rows[0]); // Respond with the updated row
  } catch (err) {
    console.error('Error while updating the database:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;