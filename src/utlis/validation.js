const validator =require("validator");

const validateSignUpData = (req) =>{
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is required!");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Enter valid email id");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password")
    }
}

const validateProfileEditData = (req) =>{
    const allowedFiled = ["firstName", "lastName" ," age", "about", "skills"];

    const isEditAllowed= Object.keys(req.body).every((field) => allowedFiled.includes(field));

    return isEditAllowed;
}

module.exports ={
    validateSignUpData,
    validateProfileEditData
}