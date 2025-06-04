const path = require("path");
const { SESSION_ID } = require(path.join(__dirname, "..","..","..", "DB","sessionConstants"));
const { USER_EMAIL } = require(path.join(__dirname, "..","..","..", "DB","userConstants"));


const CHECK_LOGIN_REQUEST_RULE = {
    "body":{
        [SESSION_ID]:{
            required: true,
            type: "string"
        },
        [USER_EMAIL]:{
            required: true,
            type: "string"
        }
    }
};

module.exports = {
    CHECK_LOGIN_REQUEST_RULE
}