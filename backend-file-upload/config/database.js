const mongoose = require("mongoose");

require("dotenv").config();

function dbConnect() {
    mongoose.connect(process.env.DB_URL)
    .then(console.log("DB connected successfully!"))
    .catch((err ) => {
        console.log("DB connection issues")
        console.error(err);
        process.exit(1);
    })
}

module.exports = dbConnect;