const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  idleTimeoutMillis: 30000, // optional, timeout for idle clients
  connectionTimeoutMillis: 2000, // optional, timeout for initial connection
});

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
