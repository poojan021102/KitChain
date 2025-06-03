const path = require("path");
const { checkRequestFormate } = require(path.join(__dirname, "..","..","..","utilities", "utilities"));
const { USER_LOGIN_REQUEST_RULE } = require(path.join(__dirname, "loginConstants"));

const userLoginBody = (req, res, next)=>{
    const reqCheck = checkRequestFormate(USER_LOGIN_REQUEST_RULE, req);
    
    if(reqCheck.valid){
        next();
    }
    else{
        return res.status(400).json({
            error: true,
            message: reqCheck.errors
        });
    }
}

module.exports = {
    userLoginBody
}