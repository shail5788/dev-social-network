const express 			=require("express");
const postRoute 		=express.Router();
const privateRoute		=require("../middleware/auth.middleware");
const {postValidator} 	=require("../validation/post.validation");
const postController 	=require("../controllers/postController");
const uploader			=require("../utils/upload.config")

const upload =uploader(req,process.env.MEDIAPATH);
postRoute.route("/")
		 .get(privateRoute,postController.getPosts)
		 .post(postValidator(),privateRoute,upload.array('media',10),postController.createPost)

postRoute.route("/:id")
		 .get(privateRoute,postController.getPost)
		 .put(postValidator(),privateRoute,postController.edit)
		 .delete(privateRoute,postController.deletePost)


module.exports =postRoute;
