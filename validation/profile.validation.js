const {check}  =require("express-validator");
const profileValidatorClass={
	
	profileValidator:()=>{

		return [
		  check('status',"Status is required").not().notEmpty(),
		  check("skills","Skills is required").not().notEmpty()		
	      ]
	},
	experinceValidator:()=>{

		return [
          check("title","title is required").not().notEmpty(),
          check("company","company is required").not().notEmpty(),
          check("from","From field is required").not().notEmpty()
		]
	},
	educationValidator:()=>{
		 return [

          check("school","school is required").not().notEmpty(),
          check("degree","degree is required").not().notEmpty(),
          check("fieldofstudy","fieldofstudy is required").not().notEmpty(),
          check("from","Form field is required").not().notEmpty()

		]
	}


}

module.exports= profileValidatorClass;