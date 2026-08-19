const mongoose = require("mongoose");


require("dotenv").config()


function dbConnect() {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch((err) => {
        console.log("Error in connecting to DB");
        console.log(err.message);  
        process.exit(1);
    })
}

module.exports = dbConnect;