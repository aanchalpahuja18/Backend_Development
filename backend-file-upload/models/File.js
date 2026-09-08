const mongoose = require("mongoose");

const File = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tags: {

    },
    email: {
        type: String,
        required: true,
        default: "aanchalpahuja34@gmail.com"
    },
    file: {
        type: FileReader,
        required: true
    }
})