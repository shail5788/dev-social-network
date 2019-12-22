const express=require("express");
const morgan =require("morgan");
const app =express();
const routes=require("./routes");


if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use(routes);

module.exports=app;

