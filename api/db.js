'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "nn",
  password: process.env.DB_PASS || "data-default",
  database: process.env.DB_NAME || "d"
});

module.exports = db
