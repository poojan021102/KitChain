const path = require("path");
const { SESSION_ID, ROLE } = require(path.join(__dirname, "..","..","..","DB", "sessionConstants"));
const { USER_EMAIL } = require(path.join(__dirname, "..","..","..","DB", "userConstants"));
const { ALL_ROLES } = require(path.join(__dirname, "..","..","..","DB", "constants"));
const LOGOUT_ROUTER = "/logout";

const LOGOUT_REQUEST_RULE = {
    "body": {
        [SESSION_ID]: {
            required: true,
            type: "string"
        },
        [ROLE]: {
            required: true,
            type: "string",
            exact: [ALL_ROLES.NORMAL_USER, ALL_ROLES.RESTAURANT_OWNER]
        },
        [USER_EMAIL]: {
            required: true,
            type: "string"
        }
    }
}

module.exports = {
    LOGOUT_ROUTER,
    LOGOUT_REQUEST_RULE
}