INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, 'Bry', 'B', 1, null),
        (2, 'Ely', 'Clown', 2, null);

INSERT INTO employee_role (id, title, salary, department_id)
VALUES  (1, 'Salesperson', 200000, 1),
        (2, 'Lead Engineer', 111000, 2),
        (2, 'Software Engineer', 99000, 2),
        (3, 'Account Manager', 10257500, 3),
        (4, 'Accountant', 8000, 3),
        (5, 'Legal Team Lead', 69420, 4),
        (6, 'Lawyer', 399, 4);

INSERT INTO department (id, department_name)
VALUES  (1, 'Sales'),
        (2, 'Engineering'),
        (3, 'Finance'),
        (4, 'Legal');

