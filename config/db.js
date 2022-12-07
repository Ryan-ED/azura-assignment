const mysql = require('mysql');

const {
  HOST, DBPORT, DBUSER, DBPASSWORD, DBNAME,
} = require('./config');

module.exports = mysql.createPool({
  host: HOST,
  port: DBPORT,
  user: DBUSER,
  password: DBPASSWORD,
  database: DBNAME,
});

// module.exports = connection;

// module.exports = mysql.createConnection({
//   host: DBPORT,
//   user: DBUSER,
//   password: DBPASSWORD,
//   database: DBNAME,
// });
