const express =require("express")
const router =express.Router();
const userRoutes=require("./user.route");
const authRoutes=require("./auth.route");


router.get("/" ,(req,res)=>{
 res.send("this is the root routes")
})
router.use("/api/v1/auth",authRoutes)
router.use("/api/v1/user",userRoutes);

module.exports=router;

