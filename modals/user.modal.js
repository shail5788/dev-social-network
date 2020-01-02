const mongoose =require("mongoose");
const bcrypt   = require("bcryptjs");
const userSchema= new mongoose.Schema({
     
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    handle:{
       type:String,
       require:true,
       unique:true    
    },
    image:{
        type:String,
    },
    password:{
        type:String,
        require:true,
    },
    create_at:{
        type:Date,
        default:Date.now
    }

})
userSchema.pre("save",async function(next){
    if(!this.isModified('password'))return next();
    this.password= await bcrypt.hash(this.password,12);
    next();
})

userSchema.methods.comparePassword=async function(condidatePassword){
    return await bcrypt.compare(condidatePassword,this.password);
}

const User=mongoose.model("user",userSchema);
module.exports=User;
