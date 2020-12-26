let mysql = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : '',
  password : '',
  database : ''
});

connection.connect();


module.exports = connection;