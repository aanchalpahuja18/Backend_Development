//importing the instance of express framework
const express = require("express");

//building a working server with the help of express framwework
const app = express();

//with this we are loading the configurations of dotenv into our process object
require("dotenv").config();

const PORT = process.env.PORT || 8000;

//middleware: to parse the json request body;
app.use(express.json());

const blogRoutes = require("./routes/blogRoutes");

//mounting the routes
app.use("/api/v1", blogRoutes);

//database connection:
const dbConnect = require("./config/database");
dbConnect();

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})

app.get("/", (req, res) => {
    res.send(`<h1>Welcome to my blogs App!</h1>`)
})