const likeService =require("../Helpers/like.service");
const likeController={
	
	getPostLike:async(req,res)=>{
	    const postId=req.params.id;                       
	    try{
	     const likes =await likeService.getlikes(postId);
	     res.status(likes.status).json(likes);	
	    }catch(err){
	     res.status(500).json({massage:err.message})
	    }
        
	},
	doLike: async(req,res)=>{
     
        const userID=(req.body.userID)?req.body.userID:req.user.id;
        const postId=req.params.id;
        try{
           const doneLike=await likeService.doLike(userID,postId);
           res.status(doneLike.status).json(doneLike);	
        }catch(err){
           res.status(500).json({message:err.message})
        }   

	}

}
module.exports =likeController;