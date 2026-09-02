
//auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next){
    try{
        const token = req.body.token;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing!"
            })
        }

        //verify the token:
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("printing decoded token:");
            console.log(decode);

            req.body = decode;
            console.log("printing req body");
            console.log(req.body);
        }catch(err){
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }

           next();
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Token could not be verified!"
        })
    }
}

function isStudent(req, res, next){
    try{
        if(req.body.role !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route only for students"
            })
        }

        next();
    }catch(err){
        return res.status(401).json({
            success: false,
            message: "You do not have valid permission to enter here!"
        })
    }

    next();
}

function isAdmin(req, res, next) {
    try{
        if(req.body.role !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route only for admins"
            })
        }

        next();
    } catch(err){
        return res.status(401).json({
            success: false,
            message: "You do not have valid permission to enter here!"
        })
    }
}

module.exports = {auth, isStudent, isAdmin}