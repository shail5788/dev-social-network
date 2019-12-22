const mongoose=require("mongoose");
const db_connect=async()=>{
    try{
        
        await mongoose.connect(process.env.MONGO_DB_STRING,
            { useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex:true,
                useFindAndModify:false
            })
        console.log("database is connected..")
    }catch(err){
        console.error(err.message);
    }    
}
module.exports=db_connect;



