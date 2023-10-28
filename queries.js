const inquirer = require('inquirer');
const pool = require('./db');

// Function to view all departments
const viewDepartments = (connection) => {
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
            setTimeout(() => {
              viewDepartments()
                .then(() => {
                  resolve();
                })
                .catch((error) => {
                  reject(error);
                });
            }, 1000);
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
          default: '',
        },
      ])
      .then((answer) => {
        const query =
          'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
        const values = [
          answer.firstName,
          answer.lastName,
          answer.roleId,
          answer.managerId === '' ? null : answer.managerId,
        ];
        pool.query(query, values, (err, res) => {
          if (err) {
            reject(err);
          } else {
            console.log('Employee added successfully!');
            const selectQuery = `
            SELECT employee.id, employee.first_name, employee.last_name, role.title
            FROM employee
            JOIN role ON employee.role_id = role.id
            WHERE employee.id = ?;
          `;
            const selectValues = [res.insertId];
            pool.query(selectQuery, selectValues, (selectErr, selectRes) => {
              if (selectErr) {
                reject(selectErr);
              } else {
                console.log('Updated employee information:');
                console.table(selectRes);
                resolve();
              }
            });
          }
        });
      })
      .then(() => {
        return viewEmployees();
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Function to add an employee role
const addEmployeeRole = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM department', (error, results) => {
      if (error) {
        reject(error);
      } else {
        const departments = results.map((department) => ({
          name: department.name,
          value: department.id,
        }));

        inquirer
          .prompt([
            {
              name: 'title',
              type: 'input',
              message: 'Enter the role you want to add:',
            },
            {
              name: 'salary',
              type: 'input',
              message: 'Enter the salary for the new role:',
            },
            {
              name: 'department_id',
              type: 'input',
              message: 'Which department does the role belong to?:',
              choices: departments,
            },
          ])
          .then((answer) => {
            pool
              .query('INSERT INTO role SET ?', {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id,
              })
              .then(() => {
                console.log('Employee role add successfully!');
                setTimeout(() => {
                  viewRoles()
                    .then(() => {
                      resolve();
                    })
                    .catch((error) => {
                      reject(error);
                    });
                }, 1000);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      }
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

        pool
          .query(query, values)
          .then(() => {
            console.log('Employee role updated successfully!');

            // Retrieve the updated employee information
            const selectQuery = `SELECT employee.id, employee.first_name, employee.last_name, role.title
              FROM employee
              JOIN role ON employee.role_id = role.id
              WHERE employee.id = ?;`;
            const selectValues = [answer.employeeId];
            pool
              .query(selectQuery, selectValues)
              .then(([result]) => {
                console.log('Updated employee information:');
                console.table(result);
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
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
// Function to start the application
const start = () => {
  console.log('Application started');
};

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addEmployee,
  addEmployeeRole,
  updateEmployeeRole,
  start,
};
