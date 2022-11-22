INSERT INTO department(id, name)
VALUES (1, 'Sales'),
       (2, 'Engineering'),
       (3, 'Finance'),
       (4, 'Legal');

INSERT INTO role(id, title, salary, department_id)
VALUES (1, 'Sales Lead', 100000, 1),
       (2, 'Salesperson', 80000, 1),
       (3, 'Lead Engineer', 150000, 2),
       (4, 'Software Engineer', 120000, 2),
       (5, 'Account Manager', 160000, 3),
       (6, 'Accountant', 125000, 3),
       (7, 'Legal Team Lead', 250000, 4),
       (8, 'Lawyer', 190000, 4);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Jon', 'Snow', 1, NULL),
       (2, 'Ash', 'Ketchum', 2, 1),
       (3, 'Eren', 'Yaeger', 3, NULL),
       (4, 'Tanjiro', 'Kamado', 4, 3),
       (5, 'Aragorn', 'Son of Arathorn', 5, NULL),
       (6, 'Bruce', 'Wayne', 6, 5),
       (7, 'Jessica', 'Audiffred', 7, NULL),
       (8, 'Arya', 'Stark', 8, 7),
       (9, 'Charlotte', 'De Witte', 8, 7),
       (10, 'DJ', 'Anna', 8, 7);