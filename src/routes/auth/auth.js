const express = require("express");
const path = require("path");
const { LOGIN_BASE_ROUTE, REGISTER_BASE_ROUTE } = require(path.join(__dirname, "authConstants"));

const loginRouter = require(path.join(__dirname, "login", "login"));
const registerRouter = require(path.join(__dirname, "register", "register"));
const authRouter = express.Router();


authRouter.use(LOGIN_BASE_ROUTE, loginRouter);

authRouter.use(REGISTER_BASE_ROUTE, registerRouter);

module.exports = authRouter;