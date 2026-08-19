//import the models:

const Post = require("../models/PostModel");
const Comment = require("../models/commentModel");

async function createComment(req, res) {
    try{
        //fetching the data from req body
        const {post, user, body} = req.body;

        console.log(post);

        //create a comment object:
        const comment = new Comment({
            post, user, body
        });

        console.log(comment);

        //save the new comment into the database
        const savedComment = await comment.save();

        console.log(savedComment);

        //find the post by ID and add the new comment to it's comment array:
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id}}, {new: true})
                            .populate("comments") //populate the comments array with comment documents
                            .exec()

        console.log(updatedPost);

        res.status(200).json({
            success: true,
            post: updatedPost,
            message: "Comment added successfully!"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error while creating a comment!"
        })
    }
}

module.exports = createComment;