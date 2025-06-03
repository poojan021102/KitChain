const sqlite3 = require('sqlite3').verbose();
const path = require("path");
const { USER_TABLE_NAME, USER_DB_TABLE_CREATION_SQL, USER_EMAIL, USER_REGESTERATION_DETAILS } = require(path.join(__dirname, "..", "..", "DB","userConstants"));
const { SESSION_ID,EXPIRES_AT,CREATED_AT,SESSION_EXPIRY_HOURS, ROLE } = require(path.join(__dirname, "..","..","DB","sessionConstants"));
const { SessionHelper } = require(path.join(__dirname, "..","session","session"));
const { ALL_ROLES } = require(path.join(__dirname, "..","..","DB","constants"));

const { DB_NAME } = require(path.join(__dirname, "..", "..", "DB","constants"));
const crypto = require("crypto");

const DB_PATH = path.join(__dirname, "..","..","DB", `${DB_NAME}.db`);

class User{
    constructor(userInformation){
        this.userInformation = userInformation;
    }
    getJson(){
        return this.userInformation;
    }
}

let userDb = new sqlite3.Database(DB_PATH);

createTable = () => {
    userDb.run(USER_DB_TABLE_CREATION_SQL)
};
createTable();

class UserBuilder{
    static async createUser(userInformation){
        try{
            await new Promise((resolve, reject) => {
                userDb.get(
                `SELECT * FROM ${USER_TABLE_NAME} WHERE ${USER_EMAIL} = ?`,
                    [userInformation[USER_EMAIL]],
                    (err, row) => {
                        if (err) return reject({ error: true, message: 'Database error', status: 500 });
                        if (row) return reject({ error: true, message: 'Email already exists', status: 400 });
                        resolve(null);
                    }
                );
            });
            let givenInformation = [];
            let givenValues = [];
            USER_REGESTERATION_DETAILS.map(key => {
                let value = userInformation[key];
                if(value){
                    givenInformation.push(key);
                    givenValues.push(value);
                }
            });
            
            
            await new Promise((resolve, reject) => {
                let creationSqlString = `insert into ${USER_TABLE_NAME} `
                creationSqlString += "(" + givenInformation.join(",") + ")" + " VALUES ";
                creationSqlString += "(" + givenInformation.map(() => '?').join(',') + ")";

                userDb.run(creationSqlString, givenValues, (err) => {
                    if (err) return reject({ status: 500, error: true, message: "Insertion failed" });
                    resolve();
                });
            });

            return {
                status: 201,
                error: false,
                user: new User(userInformation)
            };
        }
        catch(err){
            return err.status ? err : {
                status: 500,
                message: "Internal Server Error",
                error: true
            };
        }
    }

    static async login(loginInformation){
        try{

            let sqlString = `SELECT * FROM ${USER_TABLE_NAME} where `;
            let givenInformation = [];
            let givenValues = [];
            USER_REGESTERATION_DETAILS.map(key => {
                let value = loginInformation[key];
                if(value){
                    givenInformation.push(key);
                    givenValues.push(value);
                }
            });
            sqlString += givenInformation.map((key, index) => `${key} = ? `).join("and ");
            const user = await new Promise((resolve, reject) => {
            userDb.get(
                sqlString,
                givenValues,
                (err, row) => {
                        if (err) return reject({ status: 500, error: true, message: 'Database error' });
                        if (!row) return reject({ status: 404, error: true, message: 'User not found' });
                        if(row.password != loginInformation.password)return reject({status: 401, error: true, message: 'Invalid email or password'});
                        resolve(row);
                    }
                );
            });
            const sessionId = crypto.randomUUID(); // or use randomBytes(16).toString('hex')
            const now = new Date();
            // const expiresAt = new Date(now.getTime() + SESSION_EXPIRY_HOURS * 60 * 60 * 1000).toISOString(); // +24 hrs
            const expiresAt = new Date(now + SESSION_EXPIRY_HOURS * 60 * 60 * 1000).toISOString();;

            const status = await SessionHelper.createNewSession({
                [SESSION_ID]: sessionId,
                [EXPIRES_AT]: expiresAt,
                [CREATED_AT]: now,
                [USER_EMAIL]: loginInformation[USER_EMAIL],
                [ROLE]: ALL_ROLES.NORMAL_USER
            });
            let finalObject = {
                "status": 200,
                "error": false,
                "user": new User(user)
            };
            if(status){
                finalObject[SESSION_ID] = sessionId;
                finalObject[EXPIRES_AT] = expiresAt;
                finalObject[CREATED_AT] = now;
            }
            return finalObject;
        }
        catch(err){
            console.log(err);
            return err.status ? err : {
                status: 500,
                message: "Internal Server Error",
                error: true 
            }
        }
    }
}

module.exports = {
    UserBuilder
}