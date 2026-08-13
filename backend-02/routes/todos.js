const express = require('express');

//we will create route using router
const router = express.Router()

//import controller
const createTodo = require('../controllers/createTodo');

//define API route: here we have mapped the path with the controller
router.post("/createTodo", createTodo);


module.exports = router;