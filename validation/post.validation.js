const {check} =require("express-validator");


const postValidation={

	postValidator:()=>{

		 return [
             check("title","post have a title").not().notEmpty()
		 ]
	}
}

module.exports= postValidation;