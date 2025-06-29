const path = require("path");
const { checkRequestFormate } = require(path.join(__dirname, "..","..", "utilities", "utilities"));
const { CREATE_RESTAURANT_BODY_REQUEST_RULE } = require(path.join(__dirname, "constants"));
const { LoginCheck } = require(path.join(__dirname, "..","..","implementation", "checkLogin","checkLogin"));
const { SESSION_ID, ROLE } = require(path.join(__dirname, "..","..", "DB", "sessionConstants"));
const { USER_EMAIL } = require(path.join(__dirname, "..","..", "DB", "userConstants"));
const { RESTAURANT_DB_OWNER_EMAIL } = require(path.join(__dirname, "..","..","DB","restaurantConstants"));

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

const checkRestaurantOwnerLogin = async(req, res, next) => {
    try{
        let checkLoginRequestObject = {
            [SESSION_ID]: req.headers[SESSION_ID],
            [ROLE]: req.headers[ROLE],
            [USER_EMAIL]: req.headers[USER_EMAIL]
        };
        const login = await LoginCheck.checkLogin(checkLoginRequestObject);
        if(login.error){
            let message = "";
            if(login.message)message = login.message;
            return res.status(login.status).json({
                status: false,
                message
            });
        }
        req.body[RESTAURANT_DB_OWNER_EMAIL] = req.headers[USER_EMAIL];
        next();
    }
    catch(err){
        return res.status(403).json({
            error: true,
            message: "User not logged in"
        });
    }
}

module.exports = {
    checkCreateRestaurantRequest,
    checkRestaurantOwnerLogin
}