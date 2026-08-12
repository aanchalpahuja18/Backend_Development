
//server instantiate
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
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
