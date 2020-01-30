const {check} =require("express-validator");
const followerValidation={

	   validate:()=>{
            return [
                 check('userInfo.followerID',"followerID is required").not().notEmpty(),
                 check('userInfo.followeeID',"followeeID is required").not().notEmpty(),
                  check('userInfo.status',"status is required").not().notEmpty()
            ]
	   }
}

module.exports=followerValidation;
