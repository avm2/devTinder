
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    FirstName:{
        type:String
    },
    lastName:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }
});


module.exports= mongoose.model("User",userSchema);