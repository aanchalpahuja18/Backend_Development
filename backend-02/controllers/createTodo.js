//import the model:

const todo = require('../models/Todo');

//define the route handler

async function createTodo(req,res) {
    try {
        //extract title and description from the request body
        const {title, description} = req.body;
        //create a new todo object and insert it in the DB
        const response = todo.create({title,description});
        //send a json response with a success flag
        res.status(200).json({
            success: true,
            data: response,
            message: "Entry created successfully!"
        })
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json({
            success:false,
            data: "internal server error",
            message: error.message
        })
    }
}

module.exports = createTodo;