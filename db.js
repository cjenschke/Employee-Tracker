// Import the required library for MySQL database connection
const mysql = require('mysql2/promise');
// Load environment variables from .env file
require('dotenv').config();

// Assign the values from .env file
DB_USER = process.env.DB_USER;
DB_PASSWORD = process.env.DB_PASSWORD;

// Create a connection to the mysql database
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: 'employee_tracker_db',
});
// Export the db connection
module.exports = pool;
