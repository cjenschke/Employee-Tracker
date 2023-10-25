const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a connection to the mysql database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'U3hwdyi#',
  database: 'employee_tracker_db',
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to employee_tracker_db');
  start();
});
