const path = require("path");
const { SESSION_ID, ROLE } = require(path.join(__dirname, "..","..","DB","sessionConstants"));
const { USER_EMAIL } = require(path.join(__dirname, "..","..","DB","userConstants"));
const { RESTAURANT_NAME, RESTAURANT_DESCRIPTION, RESTAURANT_DB_OWNER_EMAIL } = require(path.join(__dirname, "..","..","DB","restaurantConstants"));


const CREATE_RESTAURANT_BODY_REQUEST_RULE = {
    "body":{
        [RESTAURANT_NAME]: {
            required: true,
            type: "string"
        },
        [RESTAURANT_DESCRIPTION]: {
            required: true,
            type: "string"
        },
        [RESTAURANT_DB_OWNER_EMAIL]: {
            required: true,
            type: "string"
        }
    },
    "headers": {
        [SESSION_ID]: {
            required: true,
            type: "string"
        },
        [USER_EMAIL]: {
            required: true,
            type: "string"
        },
        [ROLE]: {
            required: true,
            type: "string"
        }
    }
};

module.exports = {
    CREATE_RESTAURANT_BODY_REQUEST_RULE
};