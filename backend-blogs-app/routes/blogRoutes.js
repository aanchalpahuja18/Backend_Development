const express = require("express");

const router = express.Router();


const createPost = require("../controllers/posts");
const getPosts = require("../controllers/posts");

router.post("/posts/create", createPost);
router.get("/posts", getPosts);


module.exports = router;