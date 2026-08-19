//import mongoose
const mongoose = require("mongoose");

//route handler
const commentSchema = mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post" //reference to post model
    },
    user: {
        type: String,
        required: true,
        maxLength: 50
    },
    body: {
        type: String, 
        required: true,
        maxLength: 100
    },

})

//export:

module.exports = mongoose.model("Comment", commentSchema);