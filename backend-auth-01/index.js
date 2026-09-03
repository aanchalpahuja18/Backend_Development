//importing express js framework:
const express = require("express");

//creating our express application:
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

const dbConnect = require("./config/database");
dbConnect();


//route import and mount
const user = require("./routes/user");

app.use("/api/v1", user);


app.listen(PORT, (req, res) => {
    console.log(`App is listening at ${PORT}`);
})

app.get("/", (req, res) => {
    res.send("Welcome to the Auth API");
})