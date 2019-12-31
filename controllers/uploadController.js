const jimp =require("jimp");
const config=require("../config");
const uploader={
       
       getUploadedFiles:async(req,res)=>{
         const response={source:[]}
          // console.log(req.files);
          try{
              if(req.files){
                  let thumbnail=[];
                  let original=[];
                  req.files.forEach(file=>{
                    let path = file.destination+"/"+file.filename
                    let thumbnailPath=config.media_thumbnail_path+"/"+file.filename;
                    if(file.mimetype.split("/")[0]=="image"){
                       uploader.createThumbnail(path,config.media_thumbnail_path).then(res=>{});
                       thumbnail.push({size:"",path:thumbnailPath})
                       original.push({size:"",path:path})
                           
                    }
                 })
                  response.source.push({thumbnail:thumbnail});
                  response.source.push({original:original});    
              }

             res.status(200).json(response);   
          }catch(err){
             res.status(500).json({message:err.message})
          }
         
	   },
     createThumbnail:async(path,dir=null)=>{
        let filename =path.split("/")[4];
          jimp.read(path)
            .then(thumb => {
              let newPath=dir+"/"+filename;
              console.log(dir+"/"+filename);
              return thumb
                .resize(256, 256) // resize
                .quality(60) // set JPEG quality
                .write(newPath); // save
            })
            .catch(err => {
              console.error(err);
            });
        

     }
}


module.exports =uploader;