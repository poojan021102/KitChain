const sqlite3 = require('sqlite3').verbose();
const path = require("path");
const { SESSION_DB_INSTANCE } = require(path.join(__dirname, "..","..","DB","dbInstance"));
const { SESSION_DB_NAME, SESSION_TABLE_NAME, CHECK_LOGIN_DETAILS,SESSION_ID, USER_EMAIL, EXPIRES_AT, ROLE, CREATED_AT, SESSION_DB_CREATION_SQL, CREATE_SESSION_DETAILS } = require(path.join(__dirname, "..","..","DB", "sessionConstants"));

// const SESSION_DB_PATH = path.join(__dirname, "..","..","DB",`${SESSION_DB_NAME}.db`);

// let SESSION_DB_INSTANCE = new sqlite3.Database(SESSION_DB_PATH);

createTable = () => {
    SESSION_DB_INSTANCE.run(SESSION_DB_CREATION_SQL);
};

createTable();

class SessionHelper{
    static async createNewSession(sessionInformation){
        try{
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
                SESSION_DB_INSTANCE.run(creationSqlString, givenValues, (err) => {
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
    static async checkSessionLogin(sessionInformation){
        try{

            let sqlString = `SELECT * FROM ${SESSION_TABLE_NAME} where `;
            let givenInformation = [];
            let givenValues = [];
            CHECK_LOGIN_DETAILS.map(key => {
                let value = sessionInformation[key];
                if(value){
                    givenInformation.push(key);
                    givenValues.push(value);
                }
            });
            sqlString += givenInformation.map((key, index) => `${key} = ? `).join("and ");
            const sessionRow = await new Promise((resolve, reject) => {
                SESSION_DB_INSTANCE.get(
                    sqlString,
                    givenValues,
                    (err, row) => {
                            if (err) return reject({ status: 500, error: true, message: 'Database error' });
                            if (!row) return reject({ status: 404, error: true, message: 'Session not found' });
                            resolve(row);
                        }
                    );
            });
            const now = new Date();
            const expiry = new Date(sessionRow[EXPIRES_AT]);
            console.log(sessionRow)
            if (now > expiry) {
                // Session expired — delete it
                await new Promise((resolve, reject) => {
                SESSION_DB_INSTANCE.run(
                        `DELETE FROM ${SESSION_TABLE_NAME} WHERE ${SESSION_ID} = ?`,
                        [sessionInformation[SESSION_ID]],
                        (err) => {
                            if (err) return reject({ status: 500, error: true, message: 'Failed to delete expired session' });
                            resolve();
                        }
                    );
                });
                return {
                    error: true,
                    status: 401,
                    message: "User is already logged out"
                }
            }
            return {
                status: 200,
                error: false,
                session: sessionRow
            };
        }
        catch(err){
            console.log(err);
            return err.status ? err : {
                status: 500,
                message: "Internal Server Error",
                error: true
            };
        }
    }
}

module.exports = {
    SessionHelper
}