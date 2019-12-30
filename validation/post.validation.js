const {check} =require("express-validator");


const postValidation={

	postValidator:()=>{

		 return [
             check("content","Please enter post content").not().notEmpty()
		 ]
	}
}

module.exports= postValidation;