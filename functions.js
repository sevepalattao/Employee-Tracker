const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');
const db = require('./config/connection');

const menuChoices = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'];

const init = function () {
    inquirer
    .prompt({
        message: 'What would you like to do?',
        name: 'select',
        type: 'list',
        choices: menuChoices,
    }).then((response) => {
        if (response.select === menuChoices[0]) {
            viewDepartment();
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



module.exports = { init };