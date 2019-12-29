const Post =require("../modals/post.model");
const Errors =require("../utils/errorHandler");

const postService={

    getAllPost:async()=>{
    	const response={};
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
    	 	let post = Post({
    	 	   title:postData.title,
    	 	   description:postData.description,
    	 	   images:postData.images,
    	 	   tags:postData.tags,
    	 	   user:postData.user
    	 	})
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
    }

}

module.exports = postService;
