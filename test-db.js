const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '192.168.0.18',       // Replace with your server IP if remote
    database: 'scoreboard',  // Replace with your database name
    password: '2321',          // No password
    port: 5432,              // Default PostgreSQL port
  });

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connection successful:', res.rows[0]);
  }
  pool.end();
});