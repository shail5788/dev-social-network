const UserHelpers =require("../Helpers/user.helper");
const userController={

        getAllUser:async(req,res)=>{
            const users= await UserHelpers.getUsers();
            res.status(users.status).json(users);
        },
        createUser:async(req,res)=>{
            try{
                const newUser=await UserHelpers.createNewUser(req.body)
                res.status(newUser.status).json(newUser);
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
            const username=req.body.email;
            const password=req.body.password;
            const response=await UserHelpers.login(username,password);
            res.status(response.status).json(response);
        }
    
    
}

module.exports =userController;