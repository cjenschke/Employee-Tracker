-- Insert departments
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Hardware');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES ('Operations Manager', 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Software Manager', 80000, 2);

-- Insert Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Monco', 'Jenschke', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Wayne', 'Jenschke', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Pete', 'Jenschke', 3, 1);


