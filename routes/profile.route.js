const express           = require("express");
const profileRoute      = express.Router();
const Profile           = require("../modals/profile.model");
const profileController = require("../controllers/profileController");
const privateRoute      = require("../middleware/auth.middleware");
const profileValidator	= require("../validation/profile.validation");

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

module.exports=profileRoute;