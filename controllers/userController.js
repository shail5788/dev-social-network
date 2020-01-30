const UserHelpers =require("../Helpers/user.helper");
const {validationResult} =require("express-validator");
const userController={

        getAllUser:async(req,res)=>{
            const users= await UserHelpers.getUsers();
            res.status(users.status).json(users);
        },
        createUser:async(req,res)=>{
            const errors=validationResult(req)
            // console.log(errors);
            if(!errors.isEmpty()){
              return res.status(400).json({errors:errors.array()})
            }
            try{
                
                const newUser=await UserHelpers.createNewUser(req.body)
                let errors=[];
                if(newUser.status==400||newUser.status==500){
                  errors.push({msg:newUser.message})
                  res.status(newUser.status).json(errors)  
                }else{
                  res.status(newUser.status).json(newUser);
                }
               
            }catch(err){
               res.status(500).json(err.message);
            }
            
        },
        getUser:async(req,res)=>{
            const id=req.params.id;
            try{
                const response= await UserHelpers.getUser(id);
                res.status(response.status).json(response);
            }catch(err){
                res.status(500).json({error:err.message})
            }
            
        },
        editUser:async(req,res)=>{
            const id=req.params.id;
            const newUser=req.body;
            try{
                const response=await UserHelpers.updateUser(id,newUser);
                res.status(response.status).json(response);   
            }catch(err){
               res.status(500).json({message:err.message})
            }
            
        },
        deleteUser:(req,res)=>{
            res.send("this is the delete route")
        },
        authentication:async(req,res)=>{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()})
            }
            const username=req.body.email;
            const password=req.body.password;
            try{
                const response=await UserHelpers.login(username,password);
                
                let errors=[];
                if(response.status==400||response.status==500){
                  errors.push({msg:response.message})
                  res.status(response.status).json(errors)  
                }else{
                  res.status(response.status).json(response);
                }       
            }catch(err){
                res.status(500).json({msg:err.message});  
            }
           
        }
    
    
}

module.exports =userController;