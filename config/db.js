const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Gotham11',//process.env.PASSWORD 
    port: 3306,
    database: 'trip2gether'
});

global.db = pool.promise();