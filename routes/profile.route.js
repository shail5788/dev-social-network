const express           = require("express");
const profileRoute      = express.Router();
const Profile           = require("../modals/profile.model");
const profileController = require("../controllers/profileController");
const privateRoute      = require("../middleware/auth.middleware");

profileRoute.route("/")
            .post(privateRoute,profileController.createProfile)
            

profileRoute.route("/me")
            .get(privateRoute,profileController.getProfile)

module.exports=profileRoute;