const express=require("express");
const followController=require("../controllers/followerController");
const privateRoute=require("../middleware/auth.middleware");
const {validate}=require("../validation/followerValidation");
const FollowerRoute=express.Router();

FollowerRoute.route("/follow")
 			 .post(validate(),privateRoute,followController.follow);
FollowerRoute.route("/unfollow")
			 .post(validate(),privateRoute,followController.unFollow)
FollowerRoute.route("/:userID/followers/count")
			 .get(privateRoute,followController.getAllfollowerCount);
FollowerRoute.route("/:userID/following/count")
			 .get(privateRoute,followController.getAllFollowingCount);
FollowerRoute.route("/:userID/followers")
			 .get(privateRoute,followController.getAllFollowers);
FollowerRoute.route("/:userID/following")
			 .get(privateRoute,followController.getAllFollowing);			 

module.exports= FollowerRoute;			 	





