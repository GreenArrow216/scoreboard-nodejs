require('dotenv').config(); // Load environment variables
const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Backend!');
});

// Route for scoreboard
const scoreboardRoutes = require('./routes/scoreboard');
app.use('/scoreboard', scoreboardRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});