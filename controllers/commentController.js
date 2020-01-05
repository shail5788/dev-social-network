const commentService=require("../Helpers/comment.service");
const commentController={
    
    getPostComment:async(req,res)=>{
	     	const postID=req.params.postID;
	     	try{
	     		const comments=await commentService.getPostComment(postID);
	     		res.status(comments.status).json(comments);	
	     	}catch(err){
	     		res.status(500).json({message:err.message})
	     	}
	 },
     doComment:async(req,res)=>{
        const data=req.body.commentData;
        const postID=req.params.postID;

        try{
        	const comment = await commentService.doComment(data,postID);
        	res.status(comment.status).json(comment);

        }catch(err){
        	res.status(500).json({message:err.message})
        }

     },
     commentReply:async(req,res)=>{
         const data= req.body.data;
         const commentID=req.params.commentID;
         try{
         	const reply =await commentService.doCommentReply(data,commentID);
         	res.status(reply.status).json(reply);	
         }catch(err){
         	res.status(500).json({message:err.message})
         }
     }

}

module.exports =commentController;