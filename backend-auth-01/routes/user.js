const express = require("express");

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

module.exports = router;