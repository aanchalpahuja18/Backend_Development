//import the model 

const Todo = require("../models/Todo");

//define the router handle;

async function updateTodo (req, res) {
    try{
        const id = req.params.id;

        //another way to fetch the id is by destructuring the req.params object:
        // const {id} = req.params;
        const {title, description} = req.body;

        const todo = await Todo.findByIdAndUpdate(
            {_id: id},
            {title, description, updatedAt: Date.now()},
        )

        res.status(200).json({
            success: true,
            data: todo,
            message: "Todo updated successfully!"
        })

    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Server error"
        })
    }
}

module.exports = updateTodo;