

const adminAuth = (req,res,next) =>{
    const token="xyz";
    const isAdminAuthorization = token=="xyz";
    if(!isAdminAuthorization){
        res.status(401).send("Unauthorized user");
    }
    else{
        next();
    }
}

module.exports ={
    adminAuth,
}