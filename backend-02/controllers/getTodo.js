//import the model:

const todo = require("../models/Todo");

//define the route handler:

async function getTodo(req, res) {
    try{
        //fetch all the todo items from db:
        const todos = await todo.find({});
        //response:
        res.status(200).json({
            success:true,
            data: todos,
            message: "Entire todo data fetched successfully!"
        })
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Server error!"
        })
    }
}

module.exports = getTodo;

async function getTodoById(req,res) {
    try{
        //extract id first
        const id = req.params.id;
        console.log(id);
        //extract todo based on that id
        const item = await todo.findById({_id: id});
        
        //data for given id is not found:

        if(!item) {
            return res.status(400).json({
                success: false,
                message: "No data found with given id!"
            })
        }
        //data for given id is found
        res.status(200).json({
            success: true,
            data: item,
            message: `Todo ${id} data fetched successfully!`
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


module.exports = getTodoById;