const express=require("express");
const userController =require("../controllers/userController");
const privateRoute=require("./../middleware/auth.middleware");
const signValidation=require("../validation/signup-validation");
const userRouter=express.Router();

userRouter.route("/")
            .get(userController.getAllUser)
            .post(signValidation(),privateRoute,userController.createUser)
            
userRouter.route("/:id")
            .get(privateRoute,userController.getUser)
            .put(privateRoute,userController.editUser)
            .delete(privateRoute,userController.deleteUser)

module.exports=userRouter;