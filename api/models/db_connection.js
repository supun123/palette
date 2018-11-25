var mysql = require('mysql');

//creating connection pool
var con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'auth'
});

module.exports = con;