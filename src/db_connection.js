var mysql = require('mysql');
const { db } = require('../.env')

var connection = mysql.createConnection({
    host : 'localhost',
        user: 'root',
        password: '',
        database: 'back-laravel'
});

connection.connect(function (err) {
    // connection.end();
    if (!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});

module.exports = connection;

