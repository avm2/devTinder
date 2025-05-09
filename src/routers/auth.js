const express = require("express");
const { userAuth } = require("./middleware/auth.js");
const bcrypt = require("bcrypt");
const validator =require("validator");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    //console.log(req.body)
  
    // creating a new instance os user model
    const user = new User(req.body);
    try {
      // validation of data
      validateSignUpData(req);
  
      //encrypt password
      const {firstName, lastName, emailId, password} = req.body;
      const passwordHash = await bcrypt.hash(password,10);
  
      
      await user.save({
          firstName,
          lastName,
          emailId,
          password:passwordHash
      });
      res.send("User added successfully");
    } catch (err) {
      res.status(400).send("Internal server error");
    }
  });

authRouter.post("/login", async(req,res) =>{
    try{
        const {emailId, password} = req.body;
        const isValidEmail = validator.isEmail(emailId);
        if(!isValidEmail){
            throw new Error("Enter valid emailId")
        }

        const user = await User.findOne({emailId:emailId});

        if(!user){
            throw new Error("Email id not present in DB");
        }

        const isPasswordValid = await user.validatePassword(password)

        if(isPasswordValid){

            //Create a JWt token
            const token = await user.getJWT();

            res.cookie("token", token);
            res.send("Login successfully");
        }else{
            throw new Error("Password is not correct");
        }

    }catch(error){
        res.status(400).send("Internal server error");
    }
});

authRouter.post("/logout" ,async(req,res) =>{
    res.cookie("token", null,{
        expires: new Date(Date.now()),
    });
    res.send("Logged out successfully")
})


module.exports= authRouter;