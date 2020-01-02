const {check}=require("express-validator");

const signUpValidation=()=>{

    return [
      check("name","Name is required").not().notEmpty(),
      check("email","email is required").not().notEmpty(),
      check("email","enter valid email address").isEmail(),
      check("handle","user handle is required").not().notEmpty(),
      check("password","password is required").not().notEmpty()
    ]
}
module.exports= signUpValidation;