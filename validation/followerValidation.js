const {check} =require("express-validator");
const followerValidation={

	   validate:()=>{
            return [
                 check('followerID',"followerID is required").not().notEmpty(),
                 check('followeeID',"followeeID is required").not().notEmpty()
            ]
	   }
}

module.exports=followerValidation;
