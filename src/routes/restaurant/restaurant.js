const express = require("express");
const path = require("path");
const { checkCreateRestaurantRequest } = require(path.join(__dirname, "utilities"));

const restaurantRouter = express.Router();

restaurantRouter.post("/", checkCreateRestaurantRequest);

module.exports = restaurantRouter;