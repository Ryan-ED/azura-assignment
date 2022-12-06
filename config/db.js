const mysql = require('mysql');

const { HOST, DBUSER, DBPASSWORD } = require('./config');

module.exports = mysql.createConnection({
  host: HOST,
  user: DBUSER,
  password: DBPASSWORD,
  database: 'Azura',
});
