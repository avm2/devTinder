
const mongoose = require("mongoose");
const validator = require("validator")

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
        trim:true,
        validate(value){
            if(validator.isEmail(value)){
                throw new Error("Invalid email address:"+ value );
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(validator.isStrongPassword(value)){
                throw new Error("Enter Strong password" );
            }
        }
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

userSchema.methods.getJWT = async function (){
    const user=this;
    const token= await jwt.sign({_id:user._id},"DEV@Tinder9554",{expiresIn:"1d"});
    return token;
}


module.exports= mongoose.model("User",userSchema);