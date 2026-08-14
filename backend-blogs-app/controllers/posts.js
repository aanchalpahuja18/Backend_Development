const Blog = require("../models/BlogModel");


async function createPost(req, res) {
    try{
        const {title, content} = req.body;
        const post = Blog.create({title, content});
        res.status(200).json({
            success: true,
            data: post,
            message: "Post created successfully!"
        })
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message
        })
    }
}

module.exports = createPost;

async function getPosts(req, res) {
    try{
        const posts = await Blog.find({});
        res.status(200).json({
            success: true,
            data: posts,
            message: "Posts retrived successfully!"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message
        })
    }
}

module.exports = getPosts;