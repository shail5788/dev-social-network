const Like =require("../modals/like.model");

const likeService={

	 getlikes:async(postId)=>{
	 	console.log(postId);
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
	           							  {user:{$in:[userId]}}
	           							]
	           						});
	            
	            if(isLiked){

		              response.status=201;
		              response.message="already liked ";
		              response.response=false;		
	            } else{

	                  const currentLike=await Like.findOne({post:postId});
	                  console.log(currentLike);
	                  if(currentLike==null){
	                  	
	                  	  let count =0;
		                  count=count+1;
			              let like =new Like({
			                post:postId,
			                user:userId,
			                count:count
			              })
			            await like.save(); 
			            const newLikes=await likeService.getlikes(postId) 
			             response.status=200;
			             response.likes=newLikes.likes;
			             response.response=true;
			             response.errors=null;
	                  }else{

	                  		 let count =currentLike.count;
			                 count=count+1;
			                 const data={};
			                 data.user=currentLike.user;
			                 data.count=count;
			                 data.user.push(userId)
                            const newLikes=await Like.findOneAndUpdate(
							                            {post:postId},
							                            {$set:data},{new:true}
							                            )
		                	 response.status=200;
				             response.likes=newLikes;
				             response.response=true;
				             response.errors=null;
				             
				        	
	                  }
	                  
		             
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