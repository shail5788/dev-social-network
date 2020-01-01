const express 			=require("express");
const postRoute 		=express.Router();
const privateRoute		=require("../middleware/auth.middleware");
const {postValidator} 	=require("../validation/post.validation");
const postController 	=require("../controllers/postController");


postRoute.route("/")
		 .get(privateRoute,postController.getPosts)
		 .post(postValidator(),privateRoute,postController.createPost)

postRoute.route("/me")
		 .get(privateRoute,postController.getUserPost)

postRoute.route("/:id")
		 .get(privateRoute,postController.getPost)
		 .put(postValidator(),privateRoute,postController.edit)
		 .delete(privateRoute,postController.deletePost)


module.exports =postRoute;
