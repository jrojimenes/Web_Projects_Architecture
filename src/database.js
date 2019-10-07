const mysql       = require('mysql');
const {promisify} = require('util');
const {database}  = require('./keys');
const pool        = mysql.createPool(database);



pool.getConnection((error, connection) => {

    if(error){
        if(error.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('DATABASE CONNECTION WAS CLOSED');
        }

        if(error.code === 'ER_CON_COUNT_ERROR'){
            console.log('DATABASE HAS TO MANY CONNECTIONS');
        }

        if(error.code === 'ECONNREFUSED'){
            console.log('DATABASE CONNECTION WAS REFUSED');
        }

        if(error.code === 'ER_NOT_SUPPORTED_AUTH_MODE'){
            //if this error code apper, you should execute the next query
            //ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourPassword';
            console.log('THE AUTENTICATION METHOD IS WORNG');
        }
    }

    if(connection){
        connection.release();
        console.log('DB is Connect');
    }

    return;
});

//pool querys
pool.query = promisify(pool.query);

module.exports = pool;