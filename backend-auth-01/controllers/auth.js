//used to hash passwords:
const bcrypt = require("bcrypt");

//importing model to interact with DB
const User = require("../model/UserModel");

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

module.exports = signup;