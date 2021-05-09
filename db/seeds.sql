USE employee_tracker_db;

INSERT INTO department (name)
VALUES ("engineering");

INSERT INTO position (title, salary, department_id)
VALUES ("engineer", 90000, 1);

INSERT INTO employee (first_name, last_name, position_id, manager_id)
VALUES ("Chris", "Whalen", 1, 1);