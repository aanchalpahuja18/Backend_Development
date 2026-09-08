//app created
const express = require("express");
const app = express();

//port no fetch
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware added
app.use(express.json());

const fileUpload = require("express-fileupload");
app.use(fileUpload());

//routes mounting:
const routes = require("./routes/FileUpload");
app.use("/api/v1", routes);

//database connect:
const dbConnect = require("./config/database");
dbConnect();

//cloudinary connect:
const cloudinaryConnect = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
cloudinaryConnect();

//server activate
app.listen(PORT, (req, res) => {
    console.log("App is listening at ", PORT);
})


//default route
app.get("/", (req, res) => {
    res.send("Welcome to File Upload Portal")
})