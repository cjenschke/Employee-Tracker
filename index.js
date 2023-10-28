const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const { resolve } = require('path');

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

// Function to view all departments
const viewDepartments = () => {
  return new Promise((resolve, reject) => {
    pool
      .query('SELECT * FROM departments')
      .then((results) => {
        console.table(results);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Function to view all roles
const viewRoles = () => {
  return new Promise((resolve, reject) => {
    pool
      .query('SELECT * FROM role')
      .then((results) => {
        console.table(results);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Function to view employees
const viewEmployees = () => {
  pool.query('SELECT * FROM employee', (error, results) => {
    if (error) throw error;
    console.table(results);
    start();
  });
};

// Function to add a department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: 'Enter the department name you want to add:',
      },
    ])
    .then((answer) => {
      pool.query(
        'INSERT INTO departments SET ?',
        { name: answer.name },
        (error, results) => {
          if (error) throw error;
          console.log('Department added successfully!'), start();
        }
      );
    });
};
// Function to add an employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: "Enter the employee's first name:",
      },
      {
        name: 'lastName',
        type: 'input',
        message: "Enter the employee's last name:",
      },
      {
        name: 'roleId',
        type: 'input',
        message: "Enter the employee's role ID:",
      },
      {
        name: 'managerId',
        type: 'input',
        message: "Enter the employee's manager ID (leave blank if none):",
        default: null,
      },
    ])
    .then((answer) => {
      const query =
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
      const values = [
        answers.firstName,
        answers.lastName,
        answers.roleId,
        answers.managerId,
      ];
      connection.query(query, values, (err, res) => {
        if (err) throw err;
        console.log('Employee added successfully!');
        mainMenu();
      });
    });
};

// Function to add an employee's role
const addEmployeeRole = () => {
  inquirer
    .prompt([
      {
        name: 'employeeId',
        type: 'input',
        message: 'Enter the ID of the employee you want to update:',
      },
      {
        name: 'newRoleId',
        type: 'input',
        message: 'Enter the ID of the new role:',
      },
    ])
    .then((answers) => {
      const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
      const value = [answers.newRoleId, answers.employeeId];

      connection.query(query, values, (err, res) => {
        if (err)
          throw (err, console.log('Employee role updated successfully!'));
        mainMenu();
      });
    });
};
