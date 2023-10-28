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

let connection;

// Connect to the database
pool
  .getConnection()
  .then((conn) => {
    connection = conn;
    console.log('Connected to employee_tracker_db');
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
          break;
      }
    });
}

// Function to view all departments
const viewDepartments = () => {
  return new Promise((resolve, reject) => {
    pool
      .query('SELECT * FROM department')
      .then(([results]) => {
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
      .then(([results]) => {
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
  return new Promise((resolve, reject) => {
    pool
      .query('SELECT * FROM employee')
      .then(([results]) => {
        console.table(results);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Function to add a department
const addDepartment = () => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          name: 'name',
          type: 'input',
          message: 'Enter the department name you want to add:',
        },
      ])
      .then((answer) => {
        pool
          .query('INSERT INTO department SET ?', { name: answer.name })
          .then(() => {
            console.log('Department added successfully!');
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Function to add an employee
const addEmployee = () => {
  return new Promise((resolve, reject) => {
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
          answer.firstName,
          answer.lastName,
          answer.roleId,
          answer.managerId,
        ];
        connection.query(query, values, (err, res) => {
          if (err) {
            reject(err);
          } else {
            console.log('Employee added successfully!');
            resolve();
          }
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Function to add an employee role
const addEmployeeRole = () => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          name: 'name',
          type: 'input',
          message: 'Enter the employee role you want to add:',
        },
      ])
      .then((answer) => {
        pool
          .query('INSERT INTO role SET ?', { name: answer.name })
          .then(() => {
            console.log('Employee role add successfully!');
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Function to update an employee's role
const updateEmployeeRole = () => {
  return new Promise((resolve, reject) => {
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
      .then((answer) => {
        const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
        const values = [answer.newRoleId, answer.employeeId];

        pool.query(query, values, (err, res) => {
          if (err) {
            reject(err);
          } else {
            console.log('Employee role updated successfully!');
            resolve();
          }
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
