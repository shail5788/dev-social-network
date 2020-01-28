const express=require("express");
const followController=require("../controllers/followerController");
const privateRoute=require("../middleware/auth.middleware");
const {validate}=require("../validation/followerValidation");
const FollowerRoute=express.Router();

FollowerRoute.route("/follow")
 			 .post(validate(),privateRoute,followController.follow);
FollowerRoute.route("/unfollow")
			 .post(validate(),privateRoute,followController.unFollow)
FollowerRoute.route("/count")
			 .get(privateRoute,followController.getAllfollowerCount);
FollowerRoute.route("/followers")
			 .get(privateRoute,followController.getAllFollowers);

module.exports= FollowerRoute;			 	





