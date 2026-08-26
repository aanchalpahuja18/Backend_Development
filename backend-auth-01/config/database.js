const mongoose = require("mongoose");

require("dotenv").config();

function dbConnect() {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("DB connected successfully!");
    })
    .catch((error) => {
        console.error(error.message);
        console.log("Failure in connecting with DB");
        process.exit(1);
    })
}

module.exports = dbConnect;