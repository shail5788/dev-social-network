const mongoose =require("mongoose");
const jwt      =require("jsonwebtoken");
const bcrypt   =require("bcryptjs");
const gravatar = require('gravatar');
const User     =require("../modals/user.modal");


const UserHelpers={
        
        getUsers:async()=>{
          const response={};
            try{
             const users=await User.find({}).select("-password")
             response.status=200;
             response.users=users
             response.totalUser=users.length;
             return response;
          }catch(err){
              response.status=500;
              response.message=err.message;
              return response;
          }
        },
        getUser:async(id)=>{
            const response={};
            try{
             const user=await User.findOne({_id:id}).select("-password")
             response.status=200;
             response.user=user
             return response;
          }catch(err){
              response.status=500;
              response.message=err.message;
              return response;
          }
        },
        login:async(email,password)=>{
            const response={
               
            };
            try{
                
                    const user=await User.findOne({email:email});
                    if(user){
                        const isCorrect =await user.comparePassword(password);
                        if(isCorrect){
                            const token =await UserHelpers.createToken(user)
                            let newUser=user;
                            delete newUser.password;
                            response.status=200;
                            response.user= newUser;
                            response.token=token;
                            response.message="User logged in successfully";
                            return response;
                         }else{
                            response.status=400;    
                            response.message="password is incorrect"
                            return response;  
                        }  
                    }else{
                        response.status=400; 
                        response.message="email is incorrect"; 
                        return response;
                    }
                      
            }catch(err){
                response.status=500; 
                response.message=err.message;
                return response;
            }
            
            
        },
        
        createNewUser:async(newuser)=>{
           
            var response={};
            try{
 
                let user=await User.findOne({email:newuser.email});
                if(user){
                  response.status=400;
                  response.message="user already exist!"
                  return response;
                }
                if(newuser.handle!=""){
                    let checkHandle=await User.findOne({handle:newuser.handle});
                    if(checkHandle){
                      response.status=400;
                      response.message="Sorry!this user handle already in use";
                      return response;
                    }
                }
                
                const avatar = gravatar.url(newuser.email, {
                  s: '200',
                  r: 'pg',
                  d: 'mm'
                });
                  
                user= new User({
                        name:newuser.name,
                        email:newuser.email,
                        handle:newuser.handle,
                        image:avatar,
                        password:newuser.password
                  })
               await user.save();
               const token= await UserHelpers.createToken(user);
               response.status=200;
               response.message="user created successfully !"
               response.token=token; 
               return response;

            }catch(err){
              response.status=500;
              response.message=err.message;
              return response;
            }

        },
        updateUser:async(id,newUser)=>{
            const response={};
            try{
                const user =await User.findOne({email:newUser.email}).select("-password");
                if(user && user._id!=id){
                    response.status=400;
                    response.message="email already exist!";
                    return response;  
                }else{
                    newUser.password= await bcrypt.hash(newUser.password,12);
                    const updatedUser=await User.findByIdAndUpdate(id,newUser,{new:true});
                    response.status=200;
                    response.message="user updated successfully";
                    response.user=updatedUser;
                    return response;     
                }
                
            }catch(err){
                response.status=500;
                response.message=err.message;
                return response; 
            }
        },
        deleteUser:(id)=>{

        },
        createToken:(user)=>{
            const payload={
                user:{
                    id:user.id
                }
            }
            // console.log(payload);
            return jwt.sign(payload,process.env.SECRET,{expiresIn:3600000})
            
         }
        

}

module.exports=UserHelpers;