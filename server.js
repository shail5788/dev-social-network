const dotenv=require("dotenv");
const app =require("./app");
const db_connect =require("./db/db-connect");

dotenv.config({path:"./config.env"});
db_connect();

const port =process.env.PORT || 3200 
app.listen(port,()=>{
    console.log(`server is running on port-${port}`)
})