
//auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next){
    try{

        console.log("cookies", req.cookies.token);
        console.log("body", req.body?.token);
        console.log("header", req.header("Authorization"))

        const token = req.cookies.token || req.body?.token || req.header("Authorization").replace("Bearer ", "");

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

            req.user = decode;
            console.log("printing req body");
            console.log(req.user);
        }catch(err){
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }

           next();
    } catch(err){
        console.log("Error: ", err.message);
        return res.status(500).json({
            success: false,
            message: "Token could not be verified!"
        })
    }
}

function isStudent(req, res, next){
    try{
        if(req.user.role !== "Student"){
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
}

function isAdmin(req, res, next) {
    try{
        if(req.user.role !== "Admin"){
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