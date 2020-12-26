let mysql = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Soldat@mysql1',
  database : 'GD_DB'
});

connection.connect();


module.exports = connection;