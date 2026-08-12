
//server instantiate
const express = require('express');
const app = express();


//used to parse req.body in express -> put or post
const bodyParser = require('body-parser');

//specifically parse json data & add it to the request.body object
app.use(bodyParser.json());

//activate the server on 3000 port
app.listen(3000, () => {
    console.log("Server is up at port no 3000");
})

//routes
app.get("/", (request, response) => {
    response.send("Hello World")
})

app.post("/api/cars", (request, response) => {
    const {name, brand}  = request.body;
    console.log(name);
    console.log(brand);
    response.send("Car submitted successfully!")
})


const mongoose = require('mongoose');

//if the db is not created and the name is given then a new db will be created

//with mongoose we are now connecting our db with our server and the configuration object is not required to pass since the modern mongodb drivers have already this config object on by default and they do not recognize it as an options anymore.

//this basically returns a promise 
mongoose.connect('mongodb://localhost:27017/myDatabase')
.then(() => {
    console.log("Connection successful!");
})
.catch((error) => {
    console.log("Received an error: ", error);
})