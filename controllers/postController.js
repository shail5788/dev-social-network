const multer =require("multer");
const postService =require("../Helpers/post.service");
const {validationResult} =require("express-validator");
const postController={

     getPosts:async(req,res)=>{
     	
     	try{
     		const posts = await postService.getAllPost();
     		res.status(posts.status).json(posts);
     	}catch(err){
     		res.status(500).json({message:err.message})
     	}
     	
     },
     getPost:async(req,res)=>{
       const response={};
       const postId=req.params.id;
       try{
       	 const post = await postService.getPost(postId);
       	 res.status(post.status).json(post);
        }catch(err){
         res.status(500).json({message:err.message})
        }
     },
     createPost:async(req,res)=>{
	        console.log(req.files);
            console.log(req.body.content);  
	        const postData=req.body.data;
	        // res.status(200).json(postData);
		   //const errors =validationResult(req);
	      // if(!errors.isEmpty()){
	      // 	 return res.status(400).json({errors:errors.array()});
	      // }
          try{
	      	const post= await postService.createPost(postData);
	      	res.status(post.status).json(post);
	      }catch(err){
	      	const errors=[];
	      	res.status(500).json(errors.push({message:err.message}))
	      }

     },
     edit:async(req,res)=>{
     	  const postData={};
		  const errors =validationResult(req);
	      if(!errors.isEmpty()){
	      	 return res.status(400).json({errors:errors.array()});
	      }
	      const postId=req.params.id;
	      postData.title=title;
	      postData.description=(req.body.description)?req.body.description:"";
	      postData.images=(req.body.images)?req.body.images:[];
	      postData.user=req.user.id;
	      postData.tags=(req.body.tags)?req.body.tags:[];
	      try{
	      	const post= await postService.editPost(postData,postId);
	      	res.status(post.status).json(post);
	      }catch(err){
	      	const errors=[];
	      	res.status(500).json(errors.push({message:err.message}))
	      }
     },
     deletePost:(req,res)=>{

     },
     getUserPost:async(req,res)=>{
	      const userId=req.user.id;

	      try{
	      	const userPosts=await postService.getUserPosts(userId);
	      	res.status(userPosts.status).json(userPosts);
	      }catch(err){
	      	res.status(500).json({message:err.message});
	      }

     }



}

module.exports= postController;