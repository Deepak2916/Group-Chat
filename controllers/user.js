const UserModel=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

function generateToken(id){
    return jwt.sign({UserId:id},process.env.SECRETKEY)
}

const POstUser= async (req,res)=>{
    let {name,email,number,password}=req.body

    try{
        bcrypt.hash(password,10, async (err,hash)=>{
                    try{
                let user= await UserModel.create({name,email,number,password:hash})
    
                    res.status(200).json({
                        message:'user created successfully',
                        success:true
                    })
                
            }
            catch(err){
                res.status(208).json({
                    error:err.errors[0].message.split(' ')[0],
                    success:false
                })
            }
        })
    }
    catch(err){
       
        res.status(208).json({
            error:err.errors[0].message.split(' ')[0],
            success:false
        })
    }
}

const GetUser=async (req,res)=>{
    try{
        const Users=await UserModel.findAll()
        res.json(Users)
    }
    catch(err){
        res.json(err)
    }
}

const UserLogin = async (req,res)=>{
    let email=req.body.email
    let password=req.body.password
    let user=await UserModel.findAll({where:{email:email}})
    let userExist=user[0]
    if(userExist){
        bcrypt.compare(password,userExist.password, async (err,result)=>{
            if(result){
                res.status(200).json({
                    success:true,
                    message:'user login successful',
                    token:generateToken(userExist.id)
                })
            }
            else{
                res.status(401).json({
                    success:false,
                    message:'password is not correct'
                })
            }
            if(err){
                res.status(500).json({
                    success:false,
                    message:'something went wrong'
                })
            }
        })
    }
    else{
        res.status(404).json({
            success:false,
            message:'user not found'
        })
    }
}

const DeleteUser=async (req,res)=>{
    let email=req.params.email
    await UserModel.destroy({
        where:{email:email}
    })
}

module.exports={POstUser,GetUser,UserLogin,DeleteUser}