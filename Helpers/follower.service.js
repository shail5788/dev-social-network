const Followers= require("../modals/follow.model");

const followers={

	 getFollow:async(userInfo)=>{
        const response ={};
	 	try{
           let follow= new Followers(userInfo)
           await follow.save();
           response.status=200;
           response.follow=follow;
           response.response=true;


	 	}catch(err){
           response.status=500;
           response.follow=null;
           response.errors=err.message;  
	 	}
       return response;
	 },
	 getUnFollow:async(id)=>{
         const response={};
         const followerID=id ;
         try{
         	 
         	 let follower= await Followers.findOne({_id:followerID})
	         follower.status=false;
	         follower.end=Date.now;
	         await follow.save();
	         response.status=200;
	         response.follower=follower;
	         response.response=true;

         }catch(err){
         	
         	response.status=500;
         	response.errors=err.message;
         	response.response=false;
         }
       return response;     

    },
    getAllfollowerCount:async(userID)=>{
    	const response={};
            try{

              const followers=await Followers.find({followerID:userID})
              response.status=200;
              response.followers=followers.length;
              response.response=true;

            }catch(err){

              response.status=500;
              response.followers=null;
              response.response=false;
              response.errors=err.message;

            }
           return response; 
    },
    getAllFollowers:(userId)=>{
    	const response={};
    	try{
    		const followers=Followers.find({followerID:userId}).populate("user");
            response.status=200;
            response.followers=followers;
            response.response=true;
    	}catch(err){
    		response.status=500;
    		response.errors=err.message;
    		response.response=false;

    	}
    	return response;

    }



}