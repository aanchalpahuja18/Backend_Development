
//require() imports the specified module, local files or json files.
const express = require('express');
//instance of server created below / buuilding or creating our own server in the below line with the help of express framework, which is basically to use express in order to setup or own server in the form of app, now app is our entire server.
const app = express();

app.listen(3000, () => {
    console.log("App is running successfully!");
})