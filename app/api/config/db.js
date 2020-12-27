let mysql = require('mysql');
let connection = mysql.createConnection({
  host     : 'db',
  user     : 'root',
  password : 'example-password',
  database : 'GD_DB'
});

connection.connect();


module.exports = connection;