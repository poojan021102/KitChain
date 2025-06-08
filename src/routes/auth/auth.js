const express = require("express");
const path = require("path");
const { LOGIN_BASE_ROUTE, REGISTER_BASE_ROUTE , CHECK_LOGIN_BASE_ROUTE} = require(path.join(__dirname, "authConstants"));


const loginRouter = require(path.join(__dirname, "login", "login"));
const registerRouter = require(path.join(__dirname, "register", "register"));
const checkLoginRouter = require(path.join(__dirname, "checkLogin", "checkLogin"));
const logoutRouter = require(path.join(__dirname, "logout", "logout"));
const authRouter = express.Router();



authRouter.use(LOGIN_BASE_ROUTE, loginRouter);

authRouter.use(REGISTER_BASE_ROUTE, registerRouter);

authRouter.use(CHECK_LOGIN_BASE_ROUTE, checkLoginRouter);

authRouter.use("", logoutRouter);

module.exports = authRouter;