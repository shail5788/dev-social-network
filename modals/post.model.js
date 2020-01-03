const mongoose=require("mongoose");
const postSchema = new mongoose.Schema({

      content:{
      	type:String,
      	require:true,
      },
      media:{
        type:Boolean,
        default:false
      },
      images:{
         source:{
          	  thumbnail:[{
          	  	size:{type:String},
          	  	path:{type:String}
          	  }],
          	  original:[{
          	  	size:{type:String},
          	  	path:{type:String}
          	  }]
          },
      },
      vedio:[{
           url:{
            type:String
           }
        }],
      user:{
      	type:mongoose.Schema.Types.ObjectId,
      	ref:"user"
      },
      mediaType:{
        type:String
      },
     tags:[String],
     location:{
     	type:String
     },
     activities:{
          likes:{
            type:Number,
            default:0
          },
          comments:{
            type:Number,
            default:0
          }
     },
     created_at:{
     	type:Date,
     	default:Date.now
     } 
})
	
const Post = mongoose.model("post",postSchema);
module.exports = Post;