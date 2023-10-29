// Import the inquirer library
const inquirer = require('inquirer');

// Import the db connection
const connection = require('./db');
const pool = require('./db');

// Import functions for db
const {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addEmployee,
  addEmployeeRole,
  updateEmployeeRole,
} = require('./queries');

// Start function to initialize application
const start = () => {
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
          'Add an employee',
          'Add an employee role',
          'Update an employee role',
          'Exit',
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments()
            .then(() => start())
            .catch((error) => console.error(error));
          break;
        case 'View all roles':
          viewRoles()
            .then(() => start())
            .catch((error) => console.error(error));
          break;
        case 'View all employees':
          viewEmployees()
            .then(() => start())
            .catch((error) => console.error(error));
          break;
        case 'Add a department':
          addDepartment()
            .then(() => start())
            .catch((error) => console.error(error));
          break;
        case 'Add an employee':
          addEmployee()
            .then(() => start())
            .catch((error) => console.error(error));
          break;
        case 'Add an employee role':
          addEmployeeRole()
            .then(() => start())
            .catch((error) => console.error(error));
          break;
        case 'Update an employee role':
          updateEmployeeRole()
            .then(() => start())
            .catch((error) => console.error(error));
          break;
        case 'Exit':
          connection.end();
          console.log('Goodbye!');
          pool.end();
          process.exit();
      }
    });
};

// Export start function
module.exports = { start };
