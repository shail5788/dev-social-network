const Comment =require("../modals/comment.model");
const Post 	  =require("../modals/post.model");
const commentService={

     getPostComment:async(postID)=>{
     	const response={};
       try{
       		console.log(postID);
	       	 const comments=await Comment.findOne({post:postID})
	       	 response.status=200;
	       	 response.comments=comments;
	       	 response.response=true;
       }catch(err){
	       	response.status=500;
	       	response.comments=null;
	       	response.message=err.message;
	       	response.response=false;
       }
       return response;
     },
     doComment:async(data,postID)=>{
         const response={};
         data.post=postID;
         console.log(data);
         console.log(postID);
         try{

         	 let comment = new Comment(data)
         	 await comment.save();
         	 let post = await Post.findOne({_id:postID});
         	
         	 post.activities.comments=post.activities.comments+1;
         	 await post.save();
         	 response.status=200;
         	 response.comments=comment;
         	 response.response=true;
         }catch(err){
         	 response.status=500;
         	 response.comments=null;
         	 response.message=err.message
         	 response.response=false;
         }
         return response; 

     },
     doCommentReply:async(data,commentID)=>{
     		const response={};
     		console.log(data);
           try{
           		let reply= await Comment.findOne({_id:commentID})
           		reply.comment.data.reply.push(data);
           		await reply.save();
                 response.status=200;
                 response.comment=reply;
                 response.response=true;
           }catch(err){
           	response.status=500;
           	response.response=false;
           	response.message=err.message;
           }
           return response;
     }

}

module.exports=commentService;