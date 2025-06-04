const path = require("path");
const { checkRequestFormate } = require(path.join(__dirname, "..","..","..","utilities", "utilities"));
const { CHECK_LOGIN_REQUEST_RULE } = require(path.join(__dirname, "checkLoginConstants"));

const checkLoginBody = (req, res, next)=>{
    const reqCheck = checkRequestFormate(CHECK_LOGIN_REQUEST_RULE, req);
    
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
    checkLoginBody
}