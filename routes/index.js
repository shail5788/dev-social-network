const express       =require("express")
const router        =express.Router();
const userRoutes    =require("./user.route");
const authRoutes    =require("./auth.route");
const profileRoute  =require("./profile.route");
const postRoute		=require("./post.route")
const uploadRoute	=require("./upload.route");
const likeRoute		=require("./like.route");
const commentRouter	=require("./comment.route");
router.get("/" ,(req,res)=>{
 res.send("this is the root routes")
})
router.use("/api/v1/auth",authRoutes)
router.use("/api/v1/user",userRoutes);
router.use("/api/v1/profile",profileRoute);
router.use("/api/v1/post",postRoute);
router.use("/api/v1/upload",uploadRoute);
router.use("/api/v1/like",likeRoute);
router.use("/api/v1/comment",commentRouter)
module.exports=router;

