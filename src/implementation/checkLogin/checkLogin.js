const path = require("path");
const { SessionHelper } = require(path.join(__dirname, "..","session","session"));
const { UserBuilder } = require(path.join(__dirname, "..","user", "user"));
const { RestaurantOwnerBuilder } = require(path.join(__dirname, "..","restaurantOwner", "restaurantOwner"));
const { ROLE } = require(path.join(__dirname, "..","..","DB","sessionConstants"));
const { ALL_ROLES } = require(path.join(__dirname, "..","..","DB","constants"));
const { USER_EMAIL } = require(path.join(__dirname, "..","..","DB","userConstants"));
const { RESTAURANT_OWNER_EMAIL } = require(path.join(__dirname, "..","..","DB","restaurantOwnerConstants"));


class LoginCheck{
    static async checkLogin(sessionInformation){
        try{
            const loginSession = await SessionHelper.checkSessionLogin(sessionInformation);
            if(loginSession.error){
                let message = "";
                if(loginSession.message)message = loginSession.message;
                return {
                    status: 404,
                    error: true,
                    message
                }
            }
            let user = {
                status: 404,
                error: true,
                message: "User not found"
            };
            const session = loginSession.session;
            if(session[ROLE] == ALL_ROLES.NORMAL_USER){
                let user_temp = await UserBuilder.fetchUserFromSession({
                    [USER_EMAIL]: sessionInformation[USER_EMAIL]
                });
                if(!user_temp.error)user = {
                    status: 200,
                    error: false,
                    user: user_temp.user
                }
            }
            else if(session[ROLE] == ALL_ROLES.RESTAURANT_OWNER){
                let restaurant_owner_temp = await RestaurantOwnerBuilder.fetchRestaurantOwnerFromSession({
                    [RESTAURANT_OWNER_EMAIL]: sessionInformation[RESTAURANT_OWNER_EMAIL]
                });
                if(!restaurant_owner_temp.error)user = {
                    status: 200,
                    error: false,
                    restaurant_owner: user_temp.restaurant_owner
                }
            }
            return user;
        }
        catch(err){
            console.log(err);
            return err.status ? err : {
                status: 500,
                message: "Internal Server Error",
                error: true 
            }
        }
    }
}

module.exports = {
    LoginCheck
};