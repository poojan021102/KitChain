const sqlite3 = require('sqlite3').verbose();
const path = require("path");

const { SESSION_DB_NAME, SESSION_TABLE_NAME, SESSION_ID, USER_EMAIL, EXPIRATION_TIME, ROLE, CREATED_AT, SESSION_DB_CREATION_SQL, CREATE_SESSION_DETAILS } = require(path.join(__dirname, "..","..","DB", "sessionConstants"));

const SESSION_DB_PATH = path.join(__dirname, "..","..","DB",`${SESSION_DB_NAME}.db`);

let sessionDb = new sqlite3.Database(SESSION_DB_PATH);

createTable = () => {
    sessionDb.run(SESSION_DB_CREATION_SQL);
};

createTable();

class SessionHelper{
    static async createNewSession(sessionInformation){
        try{
            console.log(sessionInformation)
            let givenInformation = [];
            let givenValues = [];
            CREATE_SESSION_DETAILS.map(key => {
                let value = sessionInformation[key];
                if(value){
                    givenInformation.push(key);
                    givenValues.push(value);
                }
            });
            await new Promise((resolve, reject) => {
                let creationSqlString = `insert into ${SESSION_TABLE_NAME} `
                creationSqlString += "(" + givenInformation.join(",") + ")" + " VALUES ";
                creationSqlString += "(" + givenInformation.map(() => '?').join(',') + ")";
                sessionDb.run(creationSqlString, givenValues, (err) => {
                    if (err) {console.log(err);return reject({ status: 500, error: true, message: "Insertion failed" });}
                    resolve();
                });
            });
            return true;
        }
        catch(err){
            console.log(err);
            return false;
        }
    }
}

module.exports = {
    SessionHelper
}