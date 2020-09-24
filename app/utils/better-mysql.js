const mysql = require('mysql');

const config = require('../config/mysql')

let pool = mysql.createPool({
    user: config.user,
    password: config.password,
    database: config.database,
    host: config.host,
    port: config.port
})

let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        console.log("------query -> sql", sql)
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("---query -> err", err)
                reject(err)
            } else {
                connection.query(sql, values, (err, fields) => {
                    if (err) reject(err)
                    else resolve(fields)
                    connection.release();
                })
            }
        })
    })
}

module.exports = { query }