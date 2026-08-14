const express = require('express');

//we will create route using router
const router = express.Router()

//import controller
const createTodo = require('../controllers/createTodo');
const getTodo = require("../controllers/getTodo");
const getTodoById = require("../controllers/getTodo");

const updateTodo = require("../controllers/updateTodo");

const deleteTodo = require("../controllers/deleteTodo");
//define API route: here we have mapped the path with the controller
router.post("/createTodo", createTodo);

router.get("/getTodos", getTodo);

router.get("/getTodos/:id", getTodoById);

router.put("/updateTodo/:id", updateTodo);

router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;