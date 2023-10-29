-- Insert departments
INSERT INTO department (name) VALUES ('offense');
INSERT INTO department (name) VALUES ('defense');
INSERT INTO department (name) VALUES ('management');
INSERT INTO department (name) VALUES ('officiating');



-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES ('Quarterback', 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Running Back', 60000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Wide Receiver', 80000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Coach', 50000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Safety', 75000, 4);


-- Insert Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Joe', 'Montana', 1, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Bo', 'Jackson', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jerry', 'Rice', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Dennis', 'Green', 4, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Pat', 'Tillman', 5, 4);


