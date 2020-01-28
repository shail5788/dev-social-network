const mongoose =require("mongoose");
const Schema =mongoose.Schema;
const Follower =new Schema({
   followerID:{
   	type:mongoose.Schema.Types.ObjectId,
   	ref:'user'
   },
   followeeID:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"user"
   },
   status:{
     type:String,
     require:true
   },
   start:{
   	type:Date,
   	default:Date.now
   },
   end:{
   	type:Date
   }

})

const Followers=mongoose.model("followers",Follower);

module.exports =Followers; 