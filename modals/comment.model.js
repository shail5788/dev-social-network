const mongoose=require("mongoose");

const commentSchema= new mongoose.Schema({

	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"user"
	},
	post:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"post"
	},
	comment:{
		data:{
			comment:{
				type:String,
			},
			reply:[
					  {
						commentId:{
							type:mongoose.Schema.Types.ObjectId,
							ref:"comment"
						},
						message:{
							type:String
						},
						reply_at:{
							type:Date,
							default:Date.now
						}
					}
			]
		}
	},
	commented_at:{
		type:Date,
		default:Date.now
	}
});

const Comment =mongoose.model("comment",commentSchema);
module.exports=Comment;