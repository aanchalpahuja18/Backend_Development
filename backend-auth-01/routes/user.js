const express = require("express");
const User = require("../model/UserModel");

const router = express.Router();

const {signup, login} = require("../controllers/auth");
const {auth, isStudent, isAdmin} = require("../middlewares/auth");


router.post("/login", login);
router.post("/signup", signup);

//protected test route:
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected test route!"
    })
})

//protected routes:
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the student portal"
    })
})

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the admin portal"
    })
})

router.get("/email", auth, async (req, res) => {
    try{
        const id = req.user.id;
        console.log("Id", id);
        const user = await User.findById(id);
        console.log("User details", user);

        return res.status(200).json({
            success: true,
            user: user,
            id: id,
            message: "User details fetched successfully!"
        })
    } catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error fetching user details!"
        })
    }
})

module.exports = router;