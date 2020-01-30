const followerService= require("../Helpers/follower.service");
const {validationResult} =require("express-validator")

const followController={

	  follow:async(req,res)=>{

         const errors=validationResult(req);
         if(!errors.isEmpty()){
           return res.status(500).json({errors:errors.array()})
         }
         try{
         	const {userInfo}=req.body;
         	const following=await followerService.getFollow(userInfo);
         	res.status(following.status).json(following);	
         }catch(err){
         	res.status(500).json(err.message)
         }

      },
	  unFollow:async(req,res)=>{
         const errors=validationResult(req);
         if(!errors.isEmpty()){
           return res.status(400).json({errors:errors.array()})
         }
         try{
         	const userInfo=req.body;
         	const unfollow= await followerService.getUnFollow(userInfo);
         	res.status(unfollow.status).json(unfollow);
         
         }catch(err){
           res.status(500).json(err.message); 
         }
     },
     getAllfollowerCount:async(req,res)=>{
          try{
	          	
	          	if(typeof req.params.userID!=undefined && typeof req.params.userID!="undefined" && req.params.userID!=""){
	               const followers=await followerService.getAllfollowerCount(req.params.userID);
	               res.status(followers.status).json(followers);		
	          	}else{
	          		res.status(400).json({errors:"userID is required"})
	          	}

          }catch(err){
          	 res.status(500).json(err.message);
          }
               		  	                                 
     },
     getAllFollowingCount:async(req,res)=>{
     	 try{
	          	
	          	if(typeof req.params.userID!=undefined && typeof req.params.userID!="undefined" && req.params.userID!=""){
	               const followers=await followerService.getAllfollowingCount(req.params.userID);
	               res.status(followers.status).json(followers);		
	          	}else{
	          		res.status(400).json({errors:"userID is required"})
	          	}

          }catch(err){
          	 res.status(500).json(err.message);
          }
     },
     getAllFollowers:async(req,res)=>{
     	try{
	          	
	            if(typeof req.params.userID!=undefined && typeof req.params.userID!="undefined" && req.params.userID!=""){
	               const followers=await followerService.getAllfollower(req.params.userID);
	               res.status(followers.status).json(followers);		
	          	}else{
	          		res.status(400).json({errors:"userID is required"})
	          	}

          }catch(err){
          	 res.status(500).json(err.message);
          }
     },
     getAllFollowing:async(req,res)=>{
     	try{
	          	
	           if(typeof req.params.userID!=undefined && typeof req.params.userID!="undefined" && req.params.userID!=""){
	               const following=await followerService.getAllfollowing(req.params.userID);
	               res.status(following.status).json(following);		
	           }else{
	          		res.status(400).json({errors:"userID is required"})
	          	}

          }catch(err){
          	 res.status(500).json(err.message);
          }
     }

}

module.exports =followController;