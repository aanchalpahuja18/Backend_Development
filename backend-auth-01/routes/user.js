const express = require("express");

const router = express.Router();

const {signup, login} = require("../controllers/auth");
const {auth, isStudent, isAdmin} = require("../middlewares/auth");


router.post("/login", login);
router.post("/signup", signup);

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
        message: "Welcome to the student portal"
    })
})

module.exports = router;