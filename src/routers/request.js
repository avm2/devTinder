const express = require("express");
const { userAuth } = require("./middleware/auth.js");
const bcrypt = require("bcrypt");
const validator =require("validator");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");

const requestRouter = express.Router();

requestRouter.post("/sendingConnectionRequest",userAuth, async(req,res) =>{
    res.send("Connection request sent!");
})

module.exports = requestRouter;