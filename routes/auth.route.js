const express   =require("express");
const authRoutes =express.Router();
const userController  =require("../controllers/userController")


authRoutes.route("/signup")
         .post(userController.createUser)
authRoutes.route("/login")
         .post(userController.authentication)
         
         
module.exports=authRoutes;         