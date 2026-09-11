const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

require("dotenv").config();

const fileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tags: {
        type: String
    },
    email: {
        type: String,
        required: true,
        default: "aanchalpahuja34@gmail.com"
    },
    url: {
        type: String
    }
})

fileSchema.post("save", async function (doc) {
    try{
        console.log("Document: ", doc);

        //transporter
        //TODO: shift this configuration under /config folder:
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        })

        //send mail
        let info = await transporter.sendMail({
            from: "Aanchal Pahuja",
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html: `<h2>Hello World</h2> <p>File Uploaded Successfully</p>`
        })
        console.log("Info object", info)
    } catch(err){
        console.log("Error: ", err);
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;