const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const authRouter = require(path.join(__dirname, "routes", "auth", "auth"));
const restaurantRouter = require(path.join(__dirname, "routes", "restaurant", "restaurant"));

const { PORT } = require(path.join(__dirname, "constants"));
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/auth", authRouter);
app.use("/restaurant", restaurantRouter);

app.listen(PORT, () =>{
    console.log(`Successfully connected to http://localhost:${PORT}`);
});

