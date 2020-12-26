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
    get types(){

        return this.row.types
    }
    static create(domains,content,type,cb) {

        connection.query('INSERT INTO main SET domain = ?,content = ?, types = ?', [domains, content, type], (err, result) => {
            if (err) throw err

            cb(result);

        });


    }
    static update(domains,content,type,id,cb) {

    

        connection.query('UPDATE main SET domain = ?, content = ?, types = ? WHERE id = ?', [domains, content,type, id], (err, result) => {
            if (err) throw err

            cb(result);

        });


    }
    static delete(id,cb) {

    

        connection.query('DELETE FROM main WHERE id=?', [id], (err, result) => {
            if (err) throw err

            cb(result);

        });


    }

    static all(cb){

        connection.query('SELECT * FROM main', (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new Message(row)));

        } )

    }



}


module.exports = Message