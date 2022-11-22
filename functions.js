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


module.exports = { init };