const {check}=require("express-validator");
const loginValidation=()=>{

    return [
    
      check("email","email is required").not().notEmpty(),
      check("email","enter valid email address").isEmail(),
      check("password","password is required").not().notEmpty()
    ]
}
module.exports= loginValidation;