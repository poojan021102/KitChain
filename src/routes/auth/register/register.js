const express = require("express");
const path = require("path");
const { RESTAURANT_OWNER_REGISTER_ROUTE, USER_REGISTER_ROUTE } = require(path.join(__dirname, "registerConstants"));
const { checkUserRegisterBody } = require(path.join(__dirname, "utilities"));
const { UserBuilder } = require(path.join(__dirname, "..","..","..","implementation", "user","user"));

const registerRouter = express.Router();

registerRouter.post(USER_REGISTER_ROUTE, checkUserRegisterBody,async (req, res) => {
    let user = await UserBuilder.createUser(req.body);
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
        user: user.user.getJson()
    });
});

registerRouter.get(RESTAURANT_OWNER_REGISTER_ROUTE, (req, res) => {
    res.send("jello")
});

module.exports = registerRouter;