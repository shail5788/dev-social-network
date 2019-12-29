const ErrorClass={
	response:{},
    errorHandler:(err)=>{
      ErrorClass.response.status=500;
      ErrorClass.response.response=false;
      ErrorClass.response.errors=err;
      return ErrorClass.response;
    }

}
module.exports= ErrorClass;