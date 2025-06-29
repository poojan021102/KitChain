const path = require("path");
const { SESSION_ID, ROLE } = require(path.join(__dirname, "..","..","DB","sessionConstants"));
const { ALL_ROLES } = require(path.join(__dirname, "..","..","DB","constants"));
const { USER_EMAIL } = require(path.join(__dirname, "..","..","DB","userConstants"));
const { RESTAURANT_NAME, RESTAURANT_DESCRIPTION } = require(path.join(__dirname, "..","..","DB","restaurantConstants"));


const CREATE_RESTAURANT_BODY_REQUEST_RULE = {
    "body":{
        [RESTAURANT_NAME]: {
            required: true,
            type: "string"
        },
        [RESTAURANT_DESCRIPTION]: {
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
            type: "string",
            exact: [ALL_ROLES.RESTAURANT_OWNER]
        }
    }
};

module.exports = {
    CREATE_RESTAURANT_BODY_REQUEST_RULE
};