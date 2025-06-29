const path = require("path");
const { DB } = require(path.join(__dirname, "..","..","DB","dbInstances"));
const { CREATE_RESTAURANT_DETAILS, RESTAURANT_DB_TABLE_NAME, RESTAURANT_DB_CREATION_SQL } = require(path.join(__dirname, "..","..","DB","restaurantConstants"));

class Restaurant{
    constructor(restaurantInformation){
        this.restaurantInformation = restaurantInformation;
    }
    getJson(){
        return this.restaurantInformation;
    }
}

createTable = () => {
    DB.run(RESTAURANT_DB_CREATION_SQL);
};

createTable();

class RestaurantBuilder{
    static async createRestaurant(restaurantInformation){
         try{
            let givenInformation = [];
            let givenValues = [];
            CREATE_RESTAURANT_DETAILS.map(key => {
                let value = restaurantInformation[key];
                if(value){
                    givenInformation.push(key);
                    givenValues.push(value);
                }
            });
            
            await new Promise((resolve, reject) => {
                let creationSqlString = `insert into ${RESTAURANT_DB_TABLE_NAME} `
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
                restaurant: new Restaurant(restaurantInformation)
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
}

module.exports = {
    RestaurantBuilder
}