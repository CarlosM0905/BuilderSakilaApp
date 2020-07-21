const mysql = require('mysql');

const db = mysql.createPool({
    host:'localhost',
    user: 'root',
    password: 'password',
    database: 'sakila'
})

db.getConnection((err, connection)=>{
    if(err){
        throw err;
    }
    else{
        connection.release();
        console.log('Conectado a la BD');
    }
})

module.exports = {
    db
};