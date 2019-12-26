const Profile 		=require("../modals/profile.model");

const profileService={
		
		getUserProfile:async(userId)=>{
    		const response={};
    		try{
    	       const profile= await Profile.findOne({user:userId}).populate("user",['name','email']);
    	      	response.status=200;
    	      	response.profile=profile;
    	      	response.response=true;
			}catch(err){
    			response.status=500;
    			response.profile=null;
    			response.response=false;
    		}
    		return response;	               
	   },
	   createOrUpdateProfile:async(profileData)=>{
	   		const {user}=profileData;
	   		const response={};
	   		try{
	   			const profile =await Profile.findOne({user:user})
		   	    if(profile){
			   	    const updatedProdfile= await Profile.findOneAndUpdate(
			   	     {user:user},
			   	     {$set:profileData},
			   	     {new:true}); 
			   	     const newProfile=await profileService.getUserProfile(user)
			   	     response.status=200;
			   	     response.profile=newProfile.profile;
			   	     response.response=true;
			   	     response.message="Profile Updated successfully!";   	
		   	    }else{
		   	        let profile =new Profile(profileData)
		   	        	await profile.save();
		   	        const newProfile=await profileService.getUserProfile(user)
		   	         response.status=200;
			   	     response.profile=newProfile.profile;
			   	     response.response=true;
			   	     response.message="Profile Created successfully!";   
				}
				return response;
	   		}catch(err){
	   			response.status=500;
	   			response.message=err.message
	   			response.response=false;
	   			response.profile=null;
	   			return response;
	   		}
	   	    
	   },
	   getAllProfiles:async()=>{
              
          const response={};
          try{
	          	const profiles=await Profile.find({}).populate("user",['name','email']);
	          	response.status=200;
	          	response.profiles=profiles
	          	response.response=true;
	            response.no_of_profile=profiles.length;
          }catch(err){
	          	response.status=500;
	          	response.profiles=null
	          	response.response=false;
	          	response.message=err.message;
          }
          
         return response;  
	   }
}

module.exports=profileService;