require("dotenv").config();
const mysql = require("mysql2");
const logger = require("./logger");
const db = require("./sequelize");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

connection.connect(function (err) {
  if (err) {
    logger.error(err);
  }
  logger.info("CONNECTED to database");
});

connection.query(
  `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`,
  function (err, result) {
    if (err) {
      logger.error(err);
    }
    db.sync();
  }
);

module.exports = connection;
