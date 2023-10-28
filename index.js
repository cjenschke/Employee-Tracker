const inquirer = require('inquirer');
const { start } = require('./prompts');
const pool = require('./db');
const {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addEmployee,
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
