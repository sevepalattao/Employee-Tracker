const db = require('./config/connection.js');

db.connect(err => {
    if (err) throw err;
    console.log('Successfully connected to the database');
});
