const express = require("express");
const path = require("path");
const { RESTAURANT_OWNER_REGISTER_ROUTE, USER_REGISTER_ROUTE } = require(path.join(__dirname, "registerConstants"));
const { checkUserRegisterBody, checkRestaurantOwnerRegisterBody } = require(path.join(__dirname, "utilities"));
const { UserBuilder } = require(path.join(__dirname, "..","..","..","implementation", "user","user"));
const { RestaurantOwnerBuilder } = require(path.join(__dirname, "..","..","..","implementation", "restaurantOwner","restaurantOwner"));

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

registerRouter.post(RESTAURANT_OWNER_REGISTER_ROUTE, checkRestaurantOwnerRegisterBody,async(req, res) => {
    let user = await RestaurantOwnerBuilder.createRestaurantOwner(req.body);
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
        restaurant_owner: user.restaurant_owner.getJson()
    });
});

module.exports = registerRouter;