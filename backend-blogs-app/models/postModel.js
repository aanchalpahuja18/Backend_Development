//import mongoose: 
const mongoose = require("mongoose");

//route handler:
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 30
    },
    body: {
        type: String,
        required: true,
        maxLength: 100
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]

})

//export

module.exports = mongoose.model("Post", postSchema);