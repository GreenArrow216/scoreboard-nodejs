const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '192.168.0.18',       // Replace with your server IP if remote
  database: 'scoreboard',  // Replace with your database name
  password: '2321',          // No password
  port: 5432,              // Default PostgreSQL port
});

// export function query(text, params) { return pool.query(text, params); }
pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database.');
});

pool.on('error', (err) => {
  console.error('Unexpected error on the database connection:', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
