const mysql = require('mysql2/promise');
require('dotenv').config();

DB_USER = process.env.DB_USER;
DB_PASSWORD = process.env.DB_PASSWORD;

// Create a connection to the mysql database
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: 'employee_tracker_db',
  // host: 'localhost',
  // port: 3306,
  // user: 'root',
  // password: 'U3hwdyi#',
  // database: 'employee_tracker_db',
});
// let connection;
module.exports = pool;
