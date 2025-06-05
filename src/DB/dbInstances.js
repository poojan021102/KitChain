const path = require("path");
const sqlite3 = require('sqlite3').verbose();
const { SESSION_DB_NAME } = require(path.join(__dirname, "sessionConstants.js"));
const { DB_NAME } = require(path.join(__dirname, "constants"));
const DB_PATH = require(path.join(__dirname, `${DB_NAME}.db`));
const SESSION_DB_PATH = require(path.join(__dirname, `${SESSION_DB_NAME}.db`))
const DB = new sqlite3.Database(DB_PATH);
const SESSION_DB_INSTANCE = new sqlite3.Database(SESSION_DB_PATH);

module.exports = {
    DB,
    SESSION_DB_INSTANCE
}