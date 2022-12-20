const jwt=require('jsonwebtoken')

const User=require('../models/user')

const authenticate= async (req,res,next)=>{
    try{
      const token=req.header('authorization');
    //   console.log("token----->",token)
      
      const user=jwt.verify(token,process.env.SECRETKEY)
        // console.log(user)
      let groupUser= await User.findAll({where:{id:user.UserId}})
      // console.log(groupUser)
      req.user=groupUser[0];
    //   console.log(req.user)
      next()
    }
    catch(err){
        console.log(err)
        res.status(401).json({success:false})
    }
}

module.exports={authenticate}