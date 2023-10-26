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

// Prompts for user input
function start() {
  inquirer
    .prompt([
      {
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Add an employee role',
          'Exit',
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Add an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          connection.end();
          console.log('Goodbye!');
          pool.end();
          break;
      }
    });
}
