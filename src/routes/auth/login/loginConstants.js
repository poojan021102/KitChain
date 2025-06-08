const path = require("path");
const { USER_EMAIL, USER_PASSWORD } = require(path.join(__dirname, "..","..","..","DB","userConstants"));
const { RESTAURANT_OWNER_EMAIL, RESTAURANT_OWNER_PASSWORD } = require(path.join(__dirname, "..","..","..","DB","restaurantOwnerConstants"));
const USER_LOGIN_ROUTE = "/user";
const RESTAURANT_OWNER_LOGIN_ROUTE = "/restaurant-owner";

const USER_LOGIN_REQUEST_RULE = {
    "body":{
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

const RESTAURANT_OWNER_LOGIN_REQUEST_RULE = {
    "body":{
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
    USER_LOGIN_ROUTE,
    RESTAURANT_OWNER_LOGIN_ROUTE,
    USER_LOGIN_REQUEST_RULE,
    RESTAURANT_OWNER_LOGIN_REQUEST_RULE
}