const profileController={

      getProfile:(req,res)=>{
          res.send("this is profile route");
      },
      createProfile:(req,res)=>{
          res.send("create profile route")
      }
}

module.exports =profileController;