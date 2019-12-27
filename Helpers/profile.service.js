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
	   },
	   addUserExperience:async(exp,id)=>{
	   	const response={};
	    try{
	     	const profile= await Profile.findOne({user:id});
	     
	     	profile.experience.unshift(exp);
	     	await profile.save();
	     	const updatedProdfile=await profileService.getUserProfile(id)
	     	response.status=200;
	     	response.user  =updatedProdfile.profile;
	     	response.response=true;
	     	response.message="Experience is added successfully";
	     }catch(err){
	     	response.status=500;
	     	response.user  =null;
	     	response.response=false;
	     	response.message=err.message;
	     }
	     return response;  		
	   },
	   updateExperience:async(uid,expid,expData)=>{
	   	  const response={};
	   	  try{
	   	    profile = await profileService.getUserProfile(uid);
	   	  	profile.profile.experience.forEach(exp=>{
               if(exp._id==expid){
                 exp.title	=expData.title;
                 exp.company=expData.company;
                 exp.location=expData.location;
                 exp.from=expData.from;
                 exp.to=expData.to;
                 exp.current=expData.current;
                 exp.description=expData.description;   
               }
            })
           await profile.profile.save();
	           response.status=200;
	           response.profile=profile;
	           response.response=true;
	           response.message="Experience updated successfully!"; 	   	  	
	   	  }catch(err){
		   	   response.status=500;
	           response.profile=null;
	           response.response=false;
	           response.message=err.message;
	   	  }
	   	  return response;
	   },
	   addUserEducation:async(eduData,id)=>{
	   		const response={};
		    try{
		     	const profile= await Profile.findOne({user:id});
		        profile.education.unshift(eduData);
		     	await profile.save();
		     	const updatedProdfile=await profileService.getUserProfile(id)
		     	response.status=200;
		     	response.user  =updatedProdfile.profile;
		     	response.response=true;
		     	response.message="Education is added successfully";
		     }catch(err){
		     	response.status=500;
		     	response.user  =null;
		     	response.response=false;
		     	response.message=err.message;
		     }
		     return response;  	
	   }
}

module.exports=profileService;