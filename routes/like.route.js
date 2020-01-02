const express =require("express");
const likeRoute=express.Router();
const privateRoute=require("../middleware/auth.middleware");
const likeController =require("../controllers/likeController");
likeRoute.route("/:id")
		 .get(privateRoute,likeController.getPostLike)
		 .post(privateRoute,likeController.doLike)


module.exports = likeRoute;		 