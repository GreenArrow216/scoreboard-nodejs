const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_HOST,
  ssl: {
    rejectUnauthorized: false, // For self-signed certificates
  },
});

// export function query(text, params) { return pool.query(text, params); }
pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database.");
});

pool.on("error", (err) => {
  console.error("Unexpected error on the database connection:", err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
