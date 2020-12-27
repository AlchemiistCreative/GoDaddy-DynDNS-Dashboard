let mysql = require('mysql');
let connection = mysql.createConnection({
  host     : 'db',
  user     : 'root',
  password : 'root_example_password',
  database : 'GD_DB',
  port: '3306'
});

connection.connect();


module.exports = connection;