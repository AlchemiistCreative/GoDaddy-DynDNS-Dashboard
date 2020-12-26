let mysql = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : '',
  password : '',
  database : 'GD_DB'
});

connection.connect();


module.exports = connection;