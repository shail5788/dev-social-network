const jwt=require("jsonwebtoken");
const privateRoute=(req,res,next)=>{

    const token =req.header('x-auth-token');
    
    if(!token){
        return res.status(401).json({
           message:"no token, authorization is denied" 
        })
    }
    try{
        
        const decode =jwt.verify(token,process.env.SECRET);
      
        req.user=decode.user;
        next();        
    }catch(err){
        console.error(err.message)
        res.status(401).json({message:"token is invalid"})
    }

}

module.exports=privateRoute;