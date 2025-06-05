const path = require("path");
const { USER_REGISTER_REQUEST_RULE, RESTAURANT_OWNER_REGISTER_RULE } = require(path.join(__dirname, "registerConstants"));
const { checkRequestFormate } = require(path.join(__dirname, "..", "..", "..", "utilities", "utilities"));

const checkUserRegisterBody = (req, res, next)=>{
    const reqCheck = checkRequestFormate(USER_REGISTER_REQUEST_RULE, req);
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

const checkRestaurantOwnerRegisterBody = (req, res, next) => {
    const reqCheck = checkRequestFormate(RESTAURANT_OWNER_REGISTER_RULE, req);
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
    checkUserRegisterBody,
    checkRestaurantOwnerRegisterBody
}