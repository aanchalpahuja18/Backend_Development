// const Blog = require("../models/BlogModel");


// async function createPost(req, res) {
//     try{
//         const {title, content} = req.body;
//         const comment = Blog.create({title, content});
//         res.status(200),json({
//             success: true,
//             data: comment,
//             message: "Post created successfully!"
//         })
//     }
//     catch(err) {
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             data: "Internal server error",
//             message: err.message
//         })
//     }
// }