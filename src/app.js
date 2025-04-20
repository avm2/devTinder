const express = require("express");
const {connectDB}=require("./config/database.js")
const User = require("./models/user.js");

const app = express();
const {adminAuth} = require("./middleware/auth.js")



//this middleware convert JSON to JS object
app.use(express.json());

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

app.post("/signup" , async(req,res) =>{

    //console.log(req.body)
   
   // creating a new instance os user model
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User added successfully")
    }catch(err){
        res.status(400).send("Internal server error")
    }

})

//get one user
app.get("/user" , async(req,res) =>{
    const userName = req.body.firstName;
    try{
        const user= await User.find({firstName:userName});
        res.send(user);
    }catch(error){
        res.status(400).send("Something went wrong")
    }
})

//feed API
app.get("/feed" , async(req,res) =>{
   
    try{
        const users= await User.find({});
        res.send(users);
    }catch(error){
        res.status(400).send("Something went wrong")
    }
})

// delete user

app.delete("/user" , async(req,res) =>{
    const userId= req.body.userId;
    try{
        //await User.findByIdAndDelete({_id:userId});
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch(error){
        res.status(400).send("Something went wrong");
    }
})

//update user

app.patch("/user", async(req,res) =>{
    const userId = req.body.userId;
    const data = req.body;
    try{
        await User.findByIdAndUpdate({_id:userId} ,data);
        res.send("User updated successfully");
    }catch(error){
        res.status(400).send("something went wrong");
    }
})

connectDB().then(() =>{
    console.log("Database connected successfully");
    app.listen(3000, (req,res)=>{
        console.log("server running at 3000");
    })
}).catch(err=>{
    console.log("Database not connected successfully")
})



