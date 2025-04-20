const express = require("express");
const {connectDB}=require("./config/database.js")
const User = require("./models/user.js");

const app = express();
const {adminAuth} = require("./middleware/auth.js")

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
   
    //creating a new instance os user model
    const user = new User({
        firstName:"Aman",
        lastName:"Verma",
        age:22,
        gender:"Male"
    });

    await user.save();
    res.send("User added successfully")
})

connectDB().then(() =>{
    console.log("Database connected successfully");
    app.listen(3000, (req,res)=>{
        console.log("server running at 3000");
    })
}).catch(err=>{
    console.log("Database not connected successfully")
})



