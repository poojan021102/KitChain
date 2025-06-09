const path = require("path");
const { checkRequestFormate } = require(path.join(__dirname, "..","..", "utilities", "utilities"));
const { CREATE_RESTAURANT_BODY_REQUEST_RULE } = require(path.join(__dirname, "constants"));

const checkCreateRestaurantRequest = (req, res, next) => {
    const reqCheck = checkRequestFormate(CREATE_RESTAURANT_BODY_REQUEST_RULE, req);
    
    if(reqCheck.valid){
        next();
    }
    else{
        return res.status(400).json({
            error: true,
            message: reqCheck.errors
        });
    }
};

module.exports = {
    checkCreateRestaurantRequest
}