require('dotenv').config(); // Load .env variables
const express = require('express');
const db = require('./db'); // Database connection
const app = express();

app.use(express.json()); // Parse JSON request bodies

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Backend!');
});

// Example user route
const scoreboardRoutes = require('./routes/scoreboard');
app.use('/scoreboard', scoreboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
