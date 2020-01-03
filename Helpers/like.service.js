const Like =require("../modals/like.model");
const Post =require("../modals/post.model");

const likeService={

	 getlikes:async(postId)=>{
	 	  const response={};    
	       try{
	       	   const likes = await Like.find({post:postId}).populate('user',['name','handle','image'])
	       	   response.status=200;
	       	   response.likes=likes;
	       	   response.response=true;
	       	   response.error=null;
	       }catch(err){
	       	   response.status=400;
	       	   response.like=null
	       	   response.error=err.message;
	       	   response.response=false;
	       }
       return response;
	 },
	 doLike:async(userId,postId)=>{
           const response={}; 
           
           try{
	            let isLiked=await Like.findOne(
	           						{$and:[
	           							  {post:postId},
	           							  {user:userId}
	           							]
	           						});
	            if(isLiked){
	            	  response.status=201;
		              response.message="already liked ";
		              response.response=false;		
	            }else{
	              
                    let currentLike =await Post.findOne({_id:postId})
	            	     currentLike.activities.likes=currentLike.activities.likes+1;
	            	     currentLike.save();
	            	let like=new Like({
	            		post:postId,
	            		user:userId
	            	})
	            	like.save();
                     response.status=200;
		             response.post=currentLike;
		             response.response=true;
		             response.errors=null;
	            }    
	                 

           }catch(err){
	           	 response.status=500;
	             response.likes=null;
	             response.response=false;
	             response.errors=err.message;
           }
           return response;
	 }
}
module.exports=likeService;