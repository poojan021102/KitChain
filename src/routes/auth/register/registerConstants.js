const path = require("path");
const { USER_FIRST_NAME, USER_LAST_NAME, USER_EMAIL, USER_PASSWORD } = require(path.join(__dirname, "..","..","..","DB","userConstants"));
const USER_REGISTER_ROUTE = "/user";
const RESTAURANT_OWNER_REGISTER_ROUTE = "/restaurant-owner";

const USER_REGISTER_REQUEST_RULE = {
    "body":{
        [USER_FIRST_NAME]: {
            "required": true,
            "type": "string"
        },
        [USER_LAST_NAME]: {
            "required": true,
            "type": "string"
        },
        [USER_EMAIL]: {
            "required": true,
            "type": "string"
        },
        [USER_PASSWORD]: {
            "required": true,
            "type": "string"
        }
    }
}

module.exports = {
    USER_REGISTER_ROUTE,
    RESTAURANT_OWNER_REGISTER_ROUTE,
    USER_REGISTER_REQUEST_RULE
}