const mysql = require('mysql2');
require('dotenv').config({ path: '../dotenv/.env' }); 

const connection = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    database: process.env.DBNAME,
    password: process.env.DBPASS,
    port: process.env.PORT
});

module.exports = connection;
