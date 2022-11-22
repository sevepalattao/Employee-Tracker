INSERT INTO department(name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO role(title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Account Manager', 160000, 3),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Jon', 'Snow', 1, NULL),
       ('Ash', 'Ketchum', 2, 1),
       ('Eren', 'Yaeger', 3, NULL),
       ('Tanjiro', 'Kamado', 4, 3),
       ('Aragorn', 'Son of Arathorn', 5, NULL),
       ('Bruce', 'Wayne', 6, 5),
       ('Jessica', 'Audiffred', 7, NULL),
       ('Arya', 'Stark', 8, 7),
       ('Charlotte', 'De Witte', 8, 7),
       ('DJ', 'Anna', 8, 7);