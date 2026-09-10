const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

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

//image upload:

function checkFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder){
    console.log("here3")
    const options = {folder};
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

async function imageUpload(req, res) {
    try{
        //data fetch
        const {name, email, tags} = req.body;
        console.log(name, email, tags);
        const file = req.files.imageFile;
        console.log(file);

        console.log("here");

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        if(!name || !email || !tags){
            return res.status(500).json({
                success: false,
                message: "Please enter all the required fields"
            })
        }
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!checkFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format is not supported in our system!"
            })
        }
        console.log("her2")

        //file format supported:
        const response = await uploadFileToCloudinary(file, "Aanchal_Files");
        console.log("here4")
        console.log(response);

        return res.status(200).json({
            success: true,
            message: "Image uploaded successfully!"
        })
        
    }
    catch(err){ 
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

module.exports = {localFileUpload, imageUpload};