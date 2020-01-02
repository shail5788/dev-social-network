const express   =require("express");
const authRoutes =express.Router();
const userController  =require("../controllers/userController")
const signUpValidation=require("../validation/signup-validation");
const loginValidation= require("../validation/login-validation");

authRoutes.route("/signup")
         .post(signUpValidation(),userController.createUser)
authRoutes.route("/login")
         .post(loginValidation(),userController.authentication)
         
module.exports=authRoutes;         