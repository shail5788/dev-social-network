const express=require("express");
const privateRoute=require("../middleware/auth.middleware");
const commentController=require("../controllers/commentController");
const commentRouter=express.Router();

commentRouter.route("/:postID")
			 .get(privateRoute,commentController.getPostComment)
			 .post(privateRoute,commentController.doComment)

commentRouter.route("/reply/:commentID")
			 .put(privateRoute,commentController.commentReply)

module.exports=commentRouter;			 