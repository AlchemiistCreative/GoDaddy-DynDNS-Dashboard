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
    get schedule(){
        return this.row.schedule


    }
    get apikey(){
        return this.row.apikey


    }
    get secretkey(){
        return this.row.secretkey


    }
    get types(){
        return this.row.types


    }
    static all(cb){

        connection.query('SELECT * FROM main', (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new GD(row)));

        } )


    }
    static get_config(cb){

        connection.query('SELECT * FROM config', (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new GD(row)));

        } )


    }
    static update_ip(ip, cb){



        connection.query('UPDATE config SET ip = ? WHERE id = 1', [ip], (err, result) => {
            if (err) throw err

            cb(result);

        });



    }
    static add_schedule(schedule, cb){

        connection.query('UPDATE config SET schedule = ? WHERE id = 1', [schedule], (err, result) => {
            if (err) throw err

            cb(result);

        });

    }
    static add_credentials(apikey,secretkey, cb){

        connection.query('UPDATE config SET apikey = ?, secretkey = ? WHERE id = 1', [apikey, secretkey], (err, result) => {
            if (err) throw err

            cb(result);

        });

    }

}

module.exports = GD


