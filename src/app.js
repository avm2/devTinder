const express = require("express");

const app = express();

//this only match get http request
app.get("/user",(req,res) =>{
    res.send({firstName:"Aman", lastName:"verma"})
})

// this will match all http methods of all api call
app.use("/test" , (req,res)=>{
    res.send("Hello server");
})

app.use("/" , (req,res)=>{
    res.send("Aman");
})

app.listen(3000, (req,res)=>{
    console.log("server running at 3000");
})