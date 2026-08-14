const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50
    },
    content: {
        type: String,
        required: true,
        maxLength: 500 
    },
    like: {
        type: Boolean,
        required: true,
        default: true,
    },
    comments: {
        type: String,
        required: false,
        default: null
    }
})


module.exports = mongoose.model("Blog", blogSchema);