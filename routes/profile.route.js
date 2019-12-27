const express           = require("express");
const profileRoute      = express.Router();
const Profile           = require("../modals/profile.model");
const profileController = require("../controllers/profileController");
const privateRoute      = require("../middleware/auth.middleware");
const {
		profileValidator,
		experinceValidator,
		educationValidator}	= require("../validation/profile.validation");

profileRoute.route("/")
            .post(
            	 	profileValidator(),
            	 	privateRoute,
            	 	profileController.createProfile
            	 )
            
profileRoute.route("/me")
            .get(
            		privateRoute,
            		profileController.getProfile
            	)
profileRoute.route("/all")
			.get(
					privateRoute,
					profileController.getProfiles
				)
profileRoute.route("/experience")
			.put(
					experinceValidator(),
					privateRoute,
					profileController.addExperience
				)
profileRoute.route("/experience/:expid")
			.put(
				    experinceValidator(),
					privateRoute,
					profileController.editExperience
				)			
profileRoute.route("/education")
			.put(
					educationValidator(),
					privateRoute,
					profileController.addEducation
				)



module.exports=profileRoute;