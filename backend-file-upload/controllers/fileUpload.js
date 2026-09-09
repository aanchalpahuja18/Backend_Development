const File = require("../models/File");

//localFileUpload -> handler function:
 
async function localFileUpload(req, res) {
    try{
        //fetch file from request
        const file = req.files.file;
        console.log("File info: ", file);  

        //create path where file needs to be stored on server
        let extension = file.name.split(".")[1];
        let path = __dirname + "\\files\\" + Date.now() + "." +  extension;
        console.log("Path name:", path);

        //add path to the move function 
        file.mv(path, (err) => {
            console.log(err);
        })

        //create a succeasful response
        res.status(200).json({
            success: true, 
            message: "Local file uploaded successfully!"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Local file upload is facing some issues, try again later!"
        })
    }
}

module.exports = localFileUpload;