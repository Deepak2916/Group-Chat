const AdminModel=require('../models/adminUsers')

const MakeUserAdmin=async (req,res)=>{
    try{
        await AdminModel.create({
            groupId:req.body.groupId,
            userId:req.body.userId
        })
        res.status(200).json({
            success:true,
            message:'he is also admin of the group'
        })
    }
    catch(err){
        console.log(err)
        res.status(404).json(err)
    }
}

const GetAdminUsers=async (req,res)=>{
    try{
       let Admins= await AdminModel.findAll({where:{groupId:req.params.groupId}})
       res.status(200).json(Admins)
    }
    catch(err){
        console.log(err)
        res.status(404).json(err)
    }
}

module.exports={MakeUserAdmin,GetAdminUsers}