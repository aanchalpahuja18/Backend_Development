const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tags: {
        type: String
    },
    email: {
        type: String,
        required: true,
        default: "aanchalpahuja34@gmail.com"
    },
    file: {
        type: String
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;