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

module.exports = { init };