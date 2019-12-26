const {check}  =require("express-validator");

const profileValidator=()=>{

	return [
	  check('status',"Status is required").not().notEmpty(),
	  check("skills","Skiells is required").not().notEmpty()		
    ]
}

module.exports= profileValidator;