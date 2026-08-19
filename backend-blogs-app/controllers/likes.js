//import like model:

const Like = require("../models/likeModel");
const Post = require("../models/PostModel");

async function likePost(req, res) {
    try{
        const {post, user} = req.body;

        const liked = new Like({
            post, user
        });

        const savedLike = await liked.save();

        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new: true}).populate("likes").exec();

        res.status(200).json({
            success: true,
            data: updatedPost,
            message: "Liked post successfully!"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            data: err.message,
            message: "Failure in liking the post!"
        })
    }
}

async function unlikePost(req, res) {
    try{
        const {post, like} = req.body;

        //find and delete from like collection
        const deletedLike = await Like.findOneAndDelete({post: post, _id: like});

        //find and delete from post collection as well, update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id}}, {new: true})

        res.status(200).json({
            success: true,
            data: updatedPost, 
            message: "Unliked post successfully!"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            data: err.message,
            message: "Failure in liking the post!"
        })
    }
}

module.exports = {likePost, unlikePost};