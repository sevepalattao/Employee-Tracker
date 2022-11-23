const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');
const db = require('./config/connection');

const menuChoices = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'];

const init = function () {
    inquirer
    .prompt({
        message: 'What would you like to do?\n',
        name: 'select',
        type: 'list',
        choices: menuChoices,
    }).then((response) => {
        if (response.select === menuChoices[0]) {
            viewDepartment();
        } else if (response.select === menuChoices[1]) {
            viewRole();
        } else if (response.select === menuChoices[2]) {
            viewEmployees();
        } else if (response.select === menuChoices[3]) {
            addDepartment();
        } else if (response.select === menuChoices[4]) {
            addRole();
        } else if (response.select === menuChoices[5]) {
            addEmployee();
        } else if (response.select === menuChoices[6]) {
            updateEmployee();
        } else if (response.select === menuChoices[7]) {
            console.clear();
            console.log('Goodbye');
            db.end();
        }
    })
};

const viewDepartment = function() {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

const viewRole = function() {
    db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id', function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

const viewEmployees = function() {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager_id AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id', function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
};

const addDepartment = function() {
    inquirer
    .prompt({
        message: 'What is the name of the department?',
        name:'department',
        type: 'input',
    }).then((response) => {
        db.query('INSERT INTO department(name) VALUES (?)', [response.department], function(err, res) {
            if (err) throw err;
            console.log(`${response.department} department added.\n`);
            init();
        });
    });
};

const addRole = function() {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) { throw err;
        } else {
            let departments=[];
            for (let i=0; i <res.length;i++) {
                departments.push(res[i].name);
            };
            inquirer
            .prompt([
                {
                    message: 'What is the name of the role?\n',
                    name: 'role',
                    type: 'input',
                },
                {
                    message: 'What is the salary of the role?\n',
                    name: 'salary',
                    type: 'input',
                },
                {
                    message: 'Which department does the role belong to?\n',
                    type: 'list',
                    name: 'dpmt',
                    choices: departments,
                },
            ]).then((response) => {
                let dpmtID;
                for (let i =0; i< res.length; i++) {
                    if (response.dpmt === res[i].name) {
                        dpmtID = res[i].id;
                    };
                };
                
                db.query('INSERT INTO role(title, salary, department_id) VALUES(?,?,?)',[response.role, response.salary, dpmtID], function(err, res) {
                    if (err) throw err;
                    console.log(`Added ${response.role} to the database.\n`);
                    init();
                });
            });
        };
    });
};

const addEmployee = function() {
    db.query("SELECT * FROM employee JOIN role on employee.role_id = role.id", function(err, res) {
        if (err) { throw err;
        } else {
            let roles = [];
            let managerID = [];
            for (let i=0; i< res.length; i++) {
                if (res[i].manager_id) {
                    managerID.push(res[i].manager_id);
                }
                if (!roles.includes(res[i].title)) {
                    roles.push(res[i].title);
                };
            };
            inquirer
            .prompt([
                {
                    message: "What is the employee's first name?\n",
                    type: 'input',
                    name: 'first',
                },
                {
                    message: "What is the employee's last name?\n",
                    type: 'input',
                    name: 'last',
                },
                {
                    message: "What is the employee's role?\n",
                    type: 'list',
                    name: 'role',
                    choices: roles,
                },
                {
                    message: "What is their manager's ID?",
                    type: 'list',
                    name: 'manager',
                    choices: managerID,
                },
            ]).then((response) => {
                let jobID;
                for(let i=0; i<res.length; i++) {
                    if (response.role === res[i].title) {
                        jobID = res[i].role_id;
                    };
                };
                db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)', [response.first, response.last, jobID, response.manager], function(err, res) {
                    if (err) throw err;
                    console.log(`Added ${response.first} ${response.last} to the database.\n`);
                    init();
                });
            });
        };
    });
};

const updateEmployee = function() {
    db.query("SELECT * FROM employee JOIN role on employee.role_id = role.id", function(err, res) {
        if (err) { throw err;
        } else {
            let employees = [];
            let roles = [];
            for (let i=0; i<res.length; i++) {
                employees.push(res[i].first_name);
                if (!roles.includes(res[i].title)) {
                    roles.push(res[i].title);
                };
            };
            inquirer
            .prompt([
                {
                    message: "Which employee's role do you want to update?\n",
                    name: 'employee',
                    type: 'list',
                    choices: employees,
                },
                {
                    message: 'Which role do you want to assign the selected employee?\n',
                    name: 'role',
                    type: 'list',
                    choices: roles,
                },
            ]).then((response) => {
                let jobID;
                for (let i=0; i< res.length; i++) {
                    if (response.role === res[i].title) {
                        jobID = res[i].role_id;
                    };
                };

                db.query('UPDATE employee SET role_id=? WHERE first_name=?', [jobID, response.employee], function(err, res) {
                    if (err) throw err;
                    console.log("Updated employee's role.\n");
                    init();
                });
            });
        };
    });
};

module.exports = { init };