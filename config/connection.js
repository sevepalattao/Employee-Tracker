const sql = require('mysql2');

require('dotenv').config();

const db = sql.createConnection({

    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host:'127.0.0.1'

});

module.exports = db;