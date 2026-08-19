const Post = require("../models/PostModel");

async function createPost(req, res) {
    try{
        const {title, body} = req.body;

        const post = new Post({
            title, body
        });

        const savedPost = await post.save();

        res.status(200).json({
            success: true,
            data: savedPost,
            message: "Post created successfully!"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            data: err.message,
            message: "Failure in creating post!"
        })
    }
}

async function getPost(req, res) {
    try{
        const postData = await Post.find().populate("comments").exec();

        res.status(200).json({
            success: true,
            data: postData,
            message: "Post retrieved successfully!"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            data: err.message,
            message: "Failure in retrieving post!"
        })
    }
}

module.exports = {createPost, getPost}