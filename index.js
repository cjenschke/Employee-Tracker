const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

// Create a connection to the mysql database
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'U3hwdyi#',
  database: 'employee_tracker_db',
});

// Connect to the database
pool
  .getConnection()
  .then((connection) => {
    console.log('Connected to employee_tracker_db');
    connection.release();
    start();
  })
  .catch((error) => {
    console.error('Error connecting to employee_tracker_db:', error);
  });
