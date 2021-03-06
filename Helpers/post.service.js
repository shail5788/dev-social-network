const Post =require("../modals/post.model");
const likeService=require("./like.service");
const Errors =require("../utils/errorHandler");

const postService={

    getAllPost:async()=>{
    	const response={};
        const newposts=[];
    	try{
    	 	const posts =await Post.find({}).populate("user",['name'])
                response.status=200;
                response.posts=posts;
                response.response=true;
    	}catch(err){
    	   response = Errors.errorHandler(err)	
    	}
    	return response;
        
    },
    getPost:async(postID)=>{
    	try{
    	 	const post =await Post.findOne({_id:postID}).populate("user",['name'])
    	 	response.status=200;
    	 	response.post=post;
    	 	response.response=true;
    	}catch(err){
    	   response = Errors.errorHandler(err)	
    	}
    	return response;
    },
    createPost:async(postData)=>{
    	const response={};
       try{
    	 	
            let post= new Post(postData)
            await post.save();
    	 	response.status=200;
    	 	response.post=post;
    	 	response.response=true;
    	}catch(err){
    		console.log(err);
    	   response = Errors.errorHandler(err)	
    	}
    	return response;
    },
    editPost:(PostData,postID)=>{
      console.log("edit post")
    },
    deletePost:(postID)=>{
     console.log("edit post")
    },
    getUserPosts:async(user)=>{
         const response={};
         try{
                const posts= await Post.find({user:user}).populate("user",['name','email']);
                response.status=200;
                response.posts=posts;
                response.totalPost=posts.length;
                response.response=true;
             }catch(err){

                response.status=500;
                response.posts=null;
                response.totalPost=0;
                response.response=false;
                response.errors=err.message;
             }
        return response;     

    },
  
}

module.exports = postService;
