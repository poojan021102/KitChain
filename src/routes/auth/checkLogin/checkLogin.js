const express = require("express");
const path = require("path");
const checkLoginRouter = express.Router();
const { checkLoginBody } = require(path.join(__dirname, "utilities"));
const { LoginCheck } = require(path.join(__dirname, "..","..","..","implementation","checkLogin","checkLogin"));


checkLoginRouter.post("/", checkLoginBody, async(req, res) => {
    try{
        const login = await LoginCheck.checkLogin(req.body);
        if(login.error){
            let message = "";
            if(login.message)message = login.message;
            return res.status(login.status).json({
                status: false,
                message
            });
        }
        return res.status(login.status).json({
            status: true,
            user: login.user.getJson()
        });
    }
    catch(err){
        let status = 500;
        let message = "";
        if(err.message)message = err.message;
        if(err.status)status = err.status;
        return res.status(status).json({
            status: false,
            message
        });
    }
});

module.exports = checkLoginRouter;