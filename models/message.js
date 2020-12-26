let connection = require('../config/db')


class Message {

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
    
    static create(domains,content,cb) {

        connection.query('INSERT INTO ressources SET domain = ?,content = ?', [domains, content], (err, result) => {
            if (err) throw err

            cb(result);

        });


    }
    static update(domains,content,id,cb) {

    

        connection.query('UPDATE ressources SET domain = ?, content = ? WHERE id = ?', [domains, content, id], (err, result) => {
            if (err) throw err

            cb(result);

        });


    }
    static delete(id,cb) {

    

        connection.query('DELETE FROM ressources WHERE id=?', [id], (err, result) => {
            if (err) throw err

            cb(result);

        });


    }

    static all(cb){

        connection.query('SELECT * FROM ressources', (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new Message(row)));

        } )

    }



}


module.exports = Message