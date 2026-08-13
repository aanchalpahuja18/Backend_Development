
//require() imports the specified module, local files or json files.
// const express = require('express');
//instance of server created below / buuilding or creating our own server in the below line with the help of express framework, which is basically to use express in order to setup or own server in the form of app, now app is our entire server.
// const app = express();

// app.listen(3000, () => {
//     console.log("App is running successfully!");
// })


const express = require("express");
const app = express();

//load config from env file
require("dotenv").config();

//either the port no will come from the env file or else we will use the 4000 port
const PORT = process.env.PORT || 8000; 

//middleware to parse json request body
app.use(express.json())

//import routes for todo API:
const todoRoutes = require("./routes/todos")

//mount the todo API routes => add or append the todoRoutes after the /api/v1 path & we are also mapping our server with the todo routes.
app.use("/api/v1", todoRoutes);

//now the api path is localhost:4000/api/v1/createTodo

//start the server:
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})

//connect to the database:

const dbConnect = require("./config/database");
dbConnect();

//default Route:
app.get("/", (req, res) => {
    res.send(`<h1>This is home page</h1>`)
})