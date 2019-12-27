const profileService	=require("../Helpers/profile.service");
const {validationResult} =require("express-validator");
const profileController={

     getProfile:async(req,res)=>{
      	  try{
      	    const profile= await profileService.getUserProfile(req.user.id)       
            res.status(profile.status).json(profile)
      	  }catch(err){
      	  	res.status(500).json({message:err.message})
      	  }
          
      },
     getProfiles:async(req, res)=>{
       

          try{
          	const profiles= await profileService.getAllProfiles();
	          	if(profiles.status!=200){
	          		return res.status(profiles.status).json(profiles)
	          	}
          	 res.status(profiles.status).json(profiles);
          }catch(err){

            res.status(500).json({message:err.message})
          }
      },
      createProfile:async(req,res)=>{
      	  const errors =validationResult(req);
      	  if(!errors.isEmpty()){
      	  	return res.status(400).json({errors:errors.array()})
      	  }
		  const profileData ={};
          profileData.user=req.user.id;
          profileData.company			=(req.body.company)?req.body.company:"";
          profileData.website			=(req.body.website)?req.body.website:"";
          profileData.location			=(req.body.location)?req.body.location:"";
          profileData.bio				=(req.body.bio)?req.body.bio:"";
          profileData.status			=(req.body.status)?req.body.status:"";
          profileData.githubusername	=(req.body.githubusername)?req.body.githubusername:"";
          profileData.skills			=(req.body.skills)?req.body.skills.split(",").map(skill=>skill.trim()):"";
          profileData.social={};
          profileData.social.facebook	=(req.body.facebook)?req.body.facebook:"";
          profileData.social.twitter	=(req.body.twitter)?req.body.twitter:"";
          profileData.social.instagram	=(req.body.instagram)?req.body.instagram:"";
          profileData.social.youtube	=(req.body.youtube)?req.body.youtube:"";
          profileData.social.linkedin	=(req.body.linkedin)?req.body.youtube:"";   
          try{
 			const profile=await profileService.createOrUpdateProfile(profileData);
 			if(profile.status==200){
 				res.status(profile.status).json(profile);
 			}else{
 				const errors=[];
 				errors.push(profile)
 				res.status(profile.status).json({errors})
 			}

          }catch(err){
            res.status(500).json({message:err.message})
          }
      },
      addExperience:async(req,res)=>{
      	  const errors =validationResult(req);
      	  if(!errors.isEmpty()){
      	  	return res.status(400).json({errors:errors.array()})
      	  }
          const experenceData={};
          experenceData.title		=(req.body.title)?(req.body.title):"";
          experenceData.company		=(req.body.company)?(req.body.company):"";
          experenceData.location	=(req.body.location)?(req.body.location):"";
          experenceData.from		=(req.body.from)?(req.body.from):"";
          experenceData.to			=(req.body.to)?(req.body.to):"";
          experenceData.current		=(req.body.current)?(req.body.current):"";
          experenceData.description	=(req.body.description)?(req.body.description):"";
          try{

            const profile= await profileService.addUserExperience(experenceData,req.user.id);
            console.log(profile);
            res.status(profile.status).json(profile);
          }catch(err){
          	const errors=[];
            res.status(500).json(errors.push({message:err.message}));
          }
         

      },
      editExperience:async(req,res)=>{
          const errors =validationResult(req);
      	  if(!errors.isEmpty()){
      	  	return res.status(400).json({errors:errors.array()})
      	  }
          const userID		=req.user.id;
          const expID 		=req.params.expid; 
          const experenceData={};
          experenceData.title		=req.body.title;
          experenceData.company		=req.body.company;
          experenceData.location	=req.body.location;
          experenceData.from		=req.body.from;
          experenceData.to			=req.body.to;
          experenceData.current		=req.body.current;
          experenceData.description	=req.body.description;
          try{
          	 const profile = await profileService.updateExperience(userID,expID,experenceData);
          	 res.status(profile.status).json(profile); 
		  }catch(err){
 			const errors=[];
 			res.status(500).json(errors.push({message:err.message}))
		  }
         
      },
      addEducation:async(req,res)=>{
      	  
      	  const errors =validationResult(req);
      	  if(!errors.isEmpty()){
      	  	return res.status(400).json({errors:errors.array()})
      	  }
          const educationData={};
          educationData.school		=(req.body.school)?(req.body.school):"";
          educationData.degree		=(req.body.degree)?(req.body.degree):"";
          educationData.fieldofstudy=(req.body.fieldofstudy)?(req.body.fieldofstudy):"";
          educationData.from		=(req.body.from)?(req.body.from):"";
          educationData.to			=(req.body.to)?(req.body.to):"";
          educationData.current		=(req.body.current)?(req.body.current):"";
          educationData.description	=(req.body.description)?(req.body.description):"";
          try{
			const profile= await profileService.addUserEducation(educationData,req.user.id);
            res.status(profile.status).json(profile);
          }catch(err){
          	const errors=[];
            res.status(500).json(errors.push({message:err.message}));
          }
     },

}

module.exports =profileController;