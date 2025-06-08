const path = require("path");
const { USER_TABLE_NAME, USER_DB_TABLE_CREATION_SQL, USER_EMAIL, USER_REGESTERATION_DETAILS ,USER_INFORMATION_FROM_SESSION_DETAILS} = require(path.join(__dirname, "..", "..", "DB","userConstants"));
const { RESTAURANT_OWNER_TABLE_CREATION_SQL, RESTAURANT_OWNER_TABLE_NAME, RESTAURANT_OWNER_EMAIL, RESTAURANT_OWNER_REGISTRATION_DETAILS, RESTAURANT_OWNER_FROM_SESSION_DETAILS } = require(path.join(__dirname, "..", "..", "DB","restaurantOwnerConstants"));
const { DB } = require(path.join(__dirname, "..","..","DB","dbInstances"));
const { SESSION_ID,EXPIRES_AT,CREATED_AT,SESSION_EXPIRY_HOURS, ROLE } = require(path.join(__dirname, "..","..","DB","sessionConstants"));
const { SessionHelper } = require(path.join(__dirname, "..","session","session"));
const { ALL_ROLES } = require(path.join(__dirname, "..","..","DB","constants"));
const crypto = require("crypto");

class RestaurantOwner{
    constructor(restaurantOwnerInformation){
        this.restaurantOwnerInformation = restaurantOwnerInformation;
    }
    getJson(){
        return this.restaurantOwnerInformation;
    }
}

createTable = () => {
    DB.run(RESTAURANT_OWNER_TABLE_CREATION_SQL);
};
createTable();

class RestaurantOwnerBuilder{
    static async createRestaurantOwner(restaurantOwnerInformation){
         try{
            await new Promise((resolve, reject) => {
                DB.get(
                `SELECT * FROM ${RESTAURANT_OWNER_TABLE_NAME} WHERE ${RESTAURANT_OWNER_EMAIL} = ?`,
                    [restaurantOwnerInformation[RESTAURANT_OWNER_EMAIL]],
                    (err, row) => {
                        if (err) return reject({ error: true, message: 'Database error', status: 500 });
                        if (row) return reject({ error: true, message: 'Email already exists', status: 400 });
                        resolve(null);
                    }
                );
            });
            let givenInformation = [];
            let givenValues = [];
            RESTAURANT_OWNER_REGISTRATION_DETAILS.map(key => {
                let value = restaurantOwnerInformation[key];
                if(value){
                    givenInformation.push(key);
                    givenValues.push(value);
                }
            });
            
            
            await new Promise((resolve, reject) => {
                let creationSqlString = `insert into ${RESTAURANT_OWNER_TABLE_NAME} `
                creationSqlString += "(" + givenInformation.join(",") + ")" + " VALUES ";
                creationSqlString += "(" + givenInformation.map(() => '?').join(',') + ")";

                DB.run(creationSqlString, givenValues, (err) => {
                    if (err) return reject({ status: 500, error: true, message: "Insertion failed" });
                    resolve();
                });
            });

            return {
                status: 201,
                error: false,
                restaurant_owner: new RestaurantOwner(restaurantOwnerInformation)
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

            let sqlString = `SELECT * FROM ${RESTAURANT_OWNER_TABLE_NAME} where `;
            let givenInformation = [];
            let givenValues = [];
            RESTAURANT_OWNER_REGISTRATION_DETAILS.map(key => {
                let value = loginInformation[key];
                if(value){
                    givenInformation.push(key);
                    givenValues.push(value);
                }
            });
            sqlString += givenInformation.map((key) => `${key} = ? `).join("and ");
            const restaurant_owner = await new Promise((resolve, reject) => {
                DB.get(
                    sqlString,
                    givenValues,
                    (err, row) => {
                            if (err) return reject({ status: 500, error: true, message: 'Database error' });
                            if (!row) return reject({ status: 404, error: true, message: 'User not found' });
                            if(row.password != loginInformation.password)return reject({status: 401, error: true, message: 'Invalid email or password'});
                            resolve(row);
                        }
                    )
            });
            const sessionId = crypto.randomUUID(); // or use randomBytes(16).toString('hex')
            const now = new Date();
            // const expiresAt = new Date(now.getTime() + SESSION_EXPIRY_HOURS * 60 * 60 * 1000).toISOString(); // +24 hrs
            // const expiresAt = new Date(now + SESSION_EXPIRY_HOURS * 60 * 60 * 1000).toISOString();;
            const nowMs = now.getTime();

            // Step 2: Add 24 hours
            const expiryMs = nowMs + SESSION_EXPIRY_HOURS * 60 * 60 * 1000;

            // Step 3: Convert to ISO string
            const expiresAt = new Date(expiryMs).toISOString();
            // const expiresAt = new Date();
            const status = await SessionHelper.createNewSession({
                [SESSION_ID]: sessionId,
                [EXPIRES_AT]: expiresAt,
                [CREATED_AT]: now,
                [USER_EMAIL]: loginInformation[USER_EMAIL],
                [ROLE]: ALL_ROLES.RESTAURANT_OWNER
            });
            let finalObject = {
                "status": 200,
                "error": false,
                "restaurant_owner": new RestaurantOwner(restaurant_owner)
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

    static async fetchRestaurantOwnerFromSession(restaurantOwnerInformation){
        try{
            let sqlString = `SELECT * FROM ${RESTAURANT_OWNER_TABLE_NAME} where `;
            let givenInformation = [];
            let givenValues = [];
            RESTAURANT_OWNER_FROM_SESSION_DETAILS.map(key => {
                let value = restaurantOwnerInformation[key];
                if(value){
                    givenInformation.push(key);
                    givenValues.push(value);
                }
            });
            
            sqlString += givenInformation.map((key) => `${key} = ? `).join("and ");
            const restaurantOwner = await new Promise((resolve, reject) => {
                DB.get(
                    sqlString,
                    givenValues,
                    (err, row) => {
                            if (err) return reject({ status: 500, error: true, message: 'Database error' });
                            if (!row) return reject({ status: 404, error: true, message: 'User not found' });
                            resolve(row);
                        }
                )
            });
            
            return {
                status: 201,
                error: false,
                restaurant_owner : new RestaurantOwner(restaurantOwner)
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
    RestaurantOwnerBuilder
}