let connection = require('../config/db')

class GD {

    
    constructor(row) {

        this.row = row
    }

    get domain () {

        return this.row.domain
    }

    get content(){

        return this.row.content
    }
    get id(){

        return this.row.id
    }

    get ip(){
        return this.row.ip


    }
    static all(cb){

        connection.query('SELECT * FROM ressources', (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new GD(row)));

        } )


    }
    static get_ip(cb){

        connection.query('SELECT * FROM IP', (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new GD(row)));

        } )


    }
    static add_ip(ip, cb){

        connection.query('UPDATE IP SET ip = ? WHERE id = 1', [ip], (err, result) => {
            if (err) throw err

            cb(result);

        });

    }



}

module.exports = GD


