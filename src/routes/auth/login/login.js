const express = require("express");
const path = require("path");

const { RESTAURANT_OWNER_LOGIN_ROUTE, USER_LOGIN_ROUTE } = require(path.join(__dirname, "loginConstants"));
const { userLoginBody } = require(path.join(__dirname, "utilities"));
const { UserBuilder } = require(path.join(__dirname, "..","..","..","implementation","user", "user"));
const { SESSION_ID,EXPIRES_AT,CREATED_AT } = require(path.join(__dirname, "..","..","..", "DB", "sessionConstants"));
const loginRouter = express.Router();

loginRouter.post(USER_LOGIN_ROUTE, userLoginBody,async(req, res) => {
    try{
        const user = await UserBuilder.login(req.body);
        if(user.error){
            let statusCode = user.status;
            return res.status(statusCode).json({
                error: user.error,
                message: user.message
            });
        }
        let statusCode = user.status;
            return res.status(statusCode).json({
                error: user.error,
                user: user.user.getJson(),
                [SESSION_ID]: user[SESSION_ID],
                [CREATED_AT]: user[CREATED_AT],
                [EXPIRES_AT]: user[EXPIRES_AT]
            });
        }
    catch(err){
        console.log(err);
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
});

loginRouter.get(RESTAURANT_OWNER_LOGIN_ROUTE, (req, res) => {

});

module.exports = loginRouter;