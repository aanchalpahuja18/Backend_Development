const Todo = require("../models/Todo");

async function deleteTodo(req, res) {
    try{
        const {id} = req.params;
        await Todo.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Todo deleted successfully!"
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

module.exports = deleteTodo;