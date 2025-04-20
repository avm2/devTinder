
const mongoose = require("mongoose");

const connectDB = async() =>{
    await  mongoose.connect("mongodb+srv://vermaaman89635:NZXGWVHfghJAFjLB@cluster0.k0qmzne.mongodb.net/devTinder");
}

module.exports ={
    connectDB
}
