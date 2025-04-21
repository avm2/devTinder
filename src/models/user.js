
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String
    },
    age:{
        type:Number,
        min:18
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String
    },
    photoUrl:{
        type:String
    },
    skills:{
        type:[String]
    },
    about:{
        type:String,
        default:"This is short description!",
        minLength:100,
        maxLength:400
    }
},{timeStamps:true});


module.exports= mongoose.model("User",userSchema);