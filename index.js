// Import inquirer library
const inquirer = require('inquirer');

// Import the start function
const { start } = require('./prompts');

// Import db connection.
const pool = require('./db');

// Import functions for db
const {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addEmployee,
  getDepartments,
  addEmployeeRole,
  updateEmployeeRole,
} = require('./queries');

// Connect to the database
pool
  .getConnection()
  .then((connection) => {
    console.log('Connected to employee_tracker_db');
    start(connection);
  })
  .catch((error) => {
    console.error('Error connecting to employee_tracker_db:', error);
  });
