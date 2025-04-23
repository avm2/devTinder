const jwt = require("jsonwebtoken");
const User= require("../models/user");

const userAuth = async(req,res,next) =>{
    //Read the token from req.cookies
   try{
    const {token} = req.cookies;
    if(!token){
        throw new Error("Token is not valid")
    }

    const decodedData = await jwt.verify(token,"DEV@Tinder9554");

    const {_id} = decodedData;

    const user = await User.findById(_id);

    if(!user){
        throw new Error("User not found");
    }
    req.user=user;
    next();
   }catch(error){
        res.status(400).send("Error:"+ error.message)
   }

}

module.exports ={
    userAuth,
}