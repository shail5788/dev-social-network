const express			=require("express");
const config            =require("../config");
const uploadConfig		=require("../utils/upload.config");
const privateRoute		=require("../middleware/auth.middleware");
const uploadController	=require("../controllers/uploadController");
// const fileValidator		=require("../utils/upload.js");
const upload =uploadConfig(config.media_path);

const uploadRoute=express.Router();


uploadRoute.route("/")
		   .post(privateRoute,upload.array("media",10),uploadController.getUploadedFiles)


module.exports = uploadRoute;
