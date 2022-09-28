INSERT INTO department (id, department_name)
VALUES  (1, 'Sales'),
        (2, 'Engineering'),
        (3, 'Finance'),
        (4, 'Legal');
        
INSERT INTO employee_role (id, title, salary, department_id)
VALUES  (1, 'Salesperson', 200000.00, 1),
        (2, 'Lead Engineer', 111000.00, 2),
        (3, 'Software Engineer', 99000.00, 2),
        (4, 'Account Manager', 10257500.00, 3),
        (5, 'Accountant', 8000.00, 3),
        (6, 'Legal Team Lead', 69420.00, 4),
        (7, 'Lawyer', 399.00, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, 'Bry', 'Borek', 1, null),
        (2, 'Apples', 'The Horse', 2, 1);