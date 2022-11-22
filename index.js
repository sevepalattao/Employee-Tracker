const db = require('./config/connection.js');
const { init } = require('./functions.js');

db.connect(err => {
    if (err) throw err;
    console.log('Successfully connected to the database.\n');
    console.log('Welcome to My Favorite People LLC Employee Tracker!\n');
    init();
});
