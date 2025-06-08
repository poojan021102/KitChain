const express = require("express");
const path = require("path");
const { LOGOUT_ROUTER } = require(path.join(__dirname, "logoutConstants"));
const { checkUserLogoutRequestBody } = require(path.join(__dirname, "utilities"));
const { SessionHelper } = require(path.join(__dirname, "..","..","..","implementation", "session", "session"));

const logoutRouter = express.Router();

logoutRouter.delete(LOGOUT_ROUTER, checkUserLogoutRequestBody, async(req, res) => {
    const resp = await SessionHelper.logout(req.body);
    return res.send(resp.status); 
})

module.exports = logoutRouter;