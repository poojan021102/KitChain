const path = require("path");
const { USER_FIRST_NAME, USER_LAST_NAME, USER_EMAIL, USER_PASSWORD } = require(path.join(__dirname, "..","..","..","DB","userConstants"));
const { RESTAURANT_OWNER_EMAIL, RESTAURANT_OWNER_PASSWORD, RESTAURANT_OWNER_FIRST_NAME, RESTAURANT_OWNER_LAST_NAME } = require(path.join(__dirname, "..","..","..","DB","restaurantOwnerConstants"));
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

const RESTAURANT_OWNER_REGESTER_REQUEST_RULE = {
    "body":{
        [RESTAURANT_OWNER_FIRST_NAME]: {
            "required": true,
            "type": "string"
        },
        [RESTAURANT_OWNER_LAST_NAME]: {
            "required": true,
            "type": "string"
        },
        [RESTAURANT_OWNER_EMAIL]: {
            "required": true,
            "type": "string"
        },
        [RESTAURANT_OWNER_PASSWORD]: {
            "required": true,
            "type": "string"
        }
    }
}

module.exports = {
    USER_REGISTER_ROUTE,
    RESTAURANT_OWNER_REGISTER_ROUTE,
    USER_REGISTER_REQUEST_RULE,
    RESTAURANT_OWNER_REGESTER_REQUEST_RULE
}