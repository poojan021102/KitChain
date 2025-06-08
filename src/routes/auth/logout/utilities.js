const path = require("path");
const { checkRequestFormate } = require(path.join(__dirname, "..","..","..","utilities", "utilities"));
const { LOGOUT_REQUEST_RULE } = require(path.join(__dirname, "logoutConstants"));

const checkUserLogoutRequestBody = (req, res, next) => {
    const reqCheck = checkRequestFormate(LOGOUT_REQUEST_RULE, req);
    
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
    checkUserLogoutRequestBody
}