const express = require("express");
const path = require("path");
const multer  = require("multer");
const { RESTAURANT_COVER_IMAGE,RESTAURANT_IMAGE_MIMETYPE } = require(path.join(__dirname, "..", "..", "DB", "restaurantConstants"));
const { RestaurantBuilder } = require(path.join(__dirname, "..","..","implementation","restaurant", "restaurant"));
const { checkCreateRestaurantRequest, checkRestaurantOwnerLogin } = require(path.join(__dirname, "utilities"));

const upload = multer({ storage: multer.memoryStorage() });

const restaurantRouter = express.Router();

restaurantRouter.post("/", checkCreateRestaurantRequest, checkRestaurantOwnerLogin, upload.single(RESTAURANT_COVER_IMAGE),async(req, res)=>{
    try{
        let restaurantImageBlob = null;
        let restaurantImageMimeType = null;

        if(req.file){
            if (!req.file.mimetype.startsWith("image/")){
                return res.status(400).send("Only image files allowed");
            }
            restaurantImageBlob = req.file.buffer;
            restaurantImageMimeType = req.file.mimetype;
        }
        let createRestaurantBody = req.body;
        createRestaurantBody[RESTAURANT_COVER_IMAGE] = restaurantImageBlob;
        createRestaurantBody[RESTAURANT_IMAGE_MIMETYPE] = restaurantImageMimeType;

        const restaurant = await RestaurantBuilder.createRestaurant(createRestaurantBody);
        const statusCode = restaurant.status;
        if(restaurant.error){
            return res.status(statusCode).json({
                error: restaurant.error,
                message: restaurant.message
            });
        }
        return res.status(statusCode).json({
            error: restaurant.error, 
            restaurant: restaurant.restaurant.getJson()
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
});

module.exports = restaurantRouter;