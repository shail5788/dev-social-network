const multer =require("multer");
const uploadConfig=(path,valid)=>{

		const storage=multer.diskStorage({
				destination:function(req,file,cb){
                    cb(null,path)
				},
				filename:function(req,file,cb){
					cb(null,Math.floor(Math.random() * Math.floor(999999999999999999999))+file.originalname)
				}
			})
	    const upload = multer({storage:storage,
           fileFilter:fileFilter   
	    });
	    return upload;
    
}
const fileFilter=(req,files,cb)=>{

         if(files.mimetype=="image/jpeg" || files.mimetype=="image/jpg" || files.mimetype=="image/png" || files.mimetype=="image/gif" || files.mimetype=="video/mp4"){
         	cb(null,true)
         }else{
         	cb(null , false)
         }

}

module.exports= uploadConfig;