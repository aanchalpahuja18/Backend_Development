//used to hash passwords:
const bcrypt = require("bcrypt");

//importing model to interact with DB
const User = require("../model/UserModel");

//importing jwt:
const jwt = require("jsonwebtoken")

require("dotenv").config();
let secret = process.env.JWT_SECRET;

//signup route handler:
async function signup(req, res){
    try{
        //get data:
        const {name, email, password, role} = req.body;
        //check if user already exists:
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        //secure password:
        let hashedPassword;
        try{
            //hash is a method that takes 2 arguments: password to be hashed & no of rounds
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){ 
            return res.status(500).json({
                success: false,
                message: "Error in hashing password!"
            })
        }

        //create entry for user:

        const user = await User.create({
            name, email, password: hashedPassword, role
        })

        return res.status(200).json({
            success: true,
            message: "User created successfully!"
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered, please try again later!"
        })
    }
}

async function login(req, res) {
    try{
        //data fetch
        const {email, password} = req.body;

        //validation on email & password
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields!"
            })
        }

        //check for registered user
        let user = await User.findOne({email});
        console.log(user);

        //if not a registered user
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not registered!"
            })
        }

        //verify password and generate a JWT token
        const validatePassword = await  bcrypt.compare(password, user.password);

        let payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }
        if(validatePassword) {
            //password match:
            let token = jwt.sign(payload, secret, {
                expiresIn: "2h"
            })
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            }
            return res.cookie("token", token, options).status(200).json({
                success: true,
                user,
                token,
                message: "User logged in succeasfully!"
            })
        }
        else{
            //password do not match
            return res.status(403).json({
                success: false,
                message: "Password incorrect!"
            })
        }
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered, please try again later!"
        })
    }
}

module.exports = {signup, login};