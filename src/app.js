const express = require("express");
const { connectDB } = require("./config/database.js");
const { validateSignUpData } = require("./utlis/validation.js");
const cookieParser = require("cookie-parser")
const User = require("./models/user.js");
const app = express();
// const { userAuth } = require("./middleware/auth.js");
// const bcrypt = require("bcrypt");
// const validator =require("validator");


//import router
const authRouter = require("./routers/auth.js");
const profileRouter = require("./routers/profile.js");
const requestRouter = require("./routers/request.js");


//this middleware convert JSON to JS object
app.use(express.json());
app.use(cookieParser()); 

// //this only match get http request
// app.get("/user",(req,res) =>{
//     res.send({firstName:"Aman", lastName:"verma"})
// })

// // this will match all http methods of all api call
// app.use("/test" , (req,res)=>{
//     res.send("Hello server");
// })

// app.use("/" , (req,res)=>{
//     res.send("Aman");
// })

// app.get("/user" ,
//      (req,res,next) =>{
//     console.log("Hello1");
//     next();
// },
// (req,res,next) =>{
//     console.log("Hello2");
//     next();
// },
// (req,res,next) =>{
//     console.log("Hello3");
//     next();
// },
// (req,res,next) =>{
//     console.log("Hello4");
//     res.send("accepted");
// }
// )

// app.use("/admin",adminAuth);

// app.get("/admin/getAllData" ,(req,res) =>{
//     res.send("All data sent");
// });

//OR
// app.get("/admin/getAllData" , adminAuth,(req,res) =>{
//     res.send("All data sent");
// });

// app.get("/user" , (req,res,next)=>{
//     console.log("first route");
//     next();
// })

// app.get("/user" , (req,res,next)=>{
//     console.log("first route");
//     res.send("2nd response");
// })

// app.post("/signup", async (req, res) => {
//   //console.log(req.body)

//   // creating a new instance os user model
//   const user = new User(req.body);
//   try {
//     // validation of data
//     validateSignUpData(req);

//     //encrypt password
//     const {firstName, lastName, emailId, password} = req.body;
//     const passwordHash = await bcrypt.hash(password,10);

    
//     await user.save({
//         firstName,
//         lastName,
//         emailId,
//         password:passwordHash
//     });
//     res.send("User added successfully");
//   } catch (err) {
//     res.status(400).send("Internal server error");
//   }
// });

//login
// app.post("/login", async(req,res) =>{
//     try{
//         const {emailId, password} = req.body;
//         const isValidEmail = validator.isEmail(emailId);
//         if(!isValidEmail){
//             throw new Error("Enter valid emailId")
//         }

//         const user = await User.findOne({emailId:emailId});

//         if(!user){
//             throw new Error("Email id not present in DB");
//         }

//         const isPasswordValid = await user.validatePassword(password)

//         if(isPasswordValid){

//             //Create a JWt token
//             const token = await user.getJWT();

//             res.cookie("token", token);
//             res.send("Login successfully");
//         }else{
//             throw new Error("Password is not correct");
//         }

//     }catch(error){
//         res.status(400).send("Internal server error");
//     }
// })

// profile
// app.get("/profile",userAuth, async(req,res) =>{
//    try{
//     const user = req.user;

//     res.send(user);
//    }catch(err){
//     res.status(400).send("Error:"+ err.message  );
//    }


// })




// //get one user
// app.get("/user", async (req, res) => {
//   const userName = req.body.firstName;
//   try {
//     const user = await User.find({ firstName: userName });
//     res.send(user);
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// //feed API
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// // delete user

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     //await User.findByIdAndDelete({_id:userId});
//     await User.findByIdAndDelete(userId);
//     res.send("User deleted successfully");
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

//update user

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATE = ["photoUrl", "about", "skills", "age"];

    const isAllowed = Object.key(data).every((k) => {
      ALLOWED_UPDATE.includes(k);
    });

    if (!isAllowed) {
      res.status(400).send("Update is not allowed");
    }
    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, (req, res) => {
      console.log("server running at 3000");
    });
  })
  .catch((err) => {
    console.log("Database not connected successfully");
  });
