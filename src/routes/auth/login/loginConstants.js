const path = require("path");
const { USER_EMAIL, USER_PASSWORD } = require(path.join(__dirname, "..","..","..","DB","userConstants"));
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

module.exports = {
    USER_LOGIN_ROUTE,
    RESTAURANT_OWNER_LOGIN_ROUTE,
    USER_LOGIN_REQUEST_RULE
}