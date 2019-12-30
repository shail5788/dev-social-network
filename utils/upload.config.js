
const multer =require("multer");
const uploadConfig=async(req,path)=>{
	try{
		  const storage=multer.diskStorage({
				destination:function(req,file,cb){
					cb(null,path)
				},
				filename:function(req,file,cb){
					cb(null,Math.floor(Math.random() * Math.floor(999999999999999999999))+file.originalname)
				}
			})
	    const upload = await multer({storage:storage});
	   
    }catch(err){
    	throw err;
    }


module.exports= uploadConfig;