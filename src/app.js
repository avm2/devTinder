const express = require("express");

const app = express();

app.use("/test" , (req,res)=>{
    res.send("Hello server");
})

app.listen(3000, (req,res)=>{
    console.log("server running at 3000");
})