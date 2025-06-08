const path = require("path");
const { SESSION_ID, ROLE } = require(path.join(__dirname, "..","..","..", "DB","sessionConstants"));
const { USER_EMAIL } = require(path.join(__dirname, "..","..","..", "DB","userConstants"));
const { ALL_ROLES } = require(path.join(__dirname, "..", "..", "..", "DB", "constants"));

const CHECK_LOGIN_REQUEST_RULE = {
    "body":{
        [SESSION_ID]:{
            required: true,
            type: "string"
        },
        [USER_EMAIL]:{
            required: true,
            type: "string"
        },
        [ROLE]: {
            required: true,
            type: "string",
            exact: [ALL_ROLES.NORMAL_USER, ALL_ROLES.RESTAURANT_OWNER]
        }
    }
};

module.exports = {
    CHECK_LOGIN_REQUEST_RULE
}