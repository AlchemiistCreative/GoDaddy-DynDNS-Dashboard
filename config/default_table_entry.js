let connection = require('./db')

module.exports = function (){

    var sql = `INSERT INTO config (id)
    SELECT '1'
    WHERE NOT EXISTS (SELECT * FROM config)`

    var sql2 = `SELECT * FROM GD_DB.config LIMIT 1`
    
    connection.query(sql, (err) => {
        if (err) throw err

    });;

    connection.query(sql2, (err) => {
        if (err) throw err

    });;

}



