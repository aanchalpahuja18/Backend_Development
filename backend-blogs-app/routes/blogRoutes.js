const express = require("express");

const router = express.Router();

//import controllers:
const createComment = require("../controllers/comments");
const {createPost, getPost} = require("../controllers/posts");
const {likePost, unlikePost} = require("../controllers/likes");

//create mappings between routes and controllers:
router.post("/comments/create", createComment)
router.post("/posts/create", createPost);
router.get("/posts", getPost);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);

//export
module.exports = router;