// queries.js

const mysql = require('mysql');

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  insecureAuth: true
});

const databaseConnect = (query, callback) => {
  con.query(query, function (err, result, fields) {
    callback(err, result);
  });
};

module.exports = {
  databaseConnect
};