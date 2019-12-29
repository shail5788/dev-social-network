const mongoose =require("mongoose");
const likeSchema= new mongoose.Schema({

	post:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"post"
	   },
	count:{type:Number},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'
	},
	liked_at:{
		type:Date,
		default:Date.now
	}   
})

const Like =mongoose.model("like",likeSchema);
module.exports = Like;