const mysql = require('mysql2/promise');

// Create a connection to the mysql database
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'U3hwdyi#',
  database: 'employee_tracker_db',
});
// let connection;
module.exports = pool;
