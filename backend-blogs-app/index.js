const express = require("express");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8000;

//middleware: to parse the json body;
app.use(express.json());

const blogRoutes = require("./routes/blogRoutes");

//mounting the routes
app.use("/api/v1", blogRoutes);

//database connection:
const dbConnect = require("./config/database");
dbConnect();

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})

app.get("/", (req, res) => {
    res.send(`<h1>Welcome to my blogs App!</h1>`)
})