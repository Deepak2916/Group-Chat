const GroupsModel=require('../models/chatGroups')
const User=require('../models/user')
const CreateGroup= async (req,res)=>{
    try{
       let group= await req.user.createGroup({
            name:req.body.name,
            adminName:req.user.name,
            adminId:req.user.id
        })
        res.status(200).json({
            success:true,
            group:group
        })
    }
    catch(err){
        console.log(err)
        res.status(404).json({
            success:true,
            message:err
        })
    }
}
const GetGroups=async (req,res)=>{
    try{
        const groups=await req.user.getGroups()
        res.status(200).json({
            success:true,
            groups:groups,
            userId:req.user.id
        })
    }
    catch(err){
        console.log(err)
        res.status(404).json({
            success:false,
            message:err
        })
    }
}
const AddUserToGroup=async (req,res)=>{
    try{
        let user=await User.findAll({where:{email:req.body.email}})
        let group=await GroupsModel.findAll({where:{id:req.body.id}})
        await group[0].addUser(user[0])
        res.status(200).json({
            success:true,
            user:user
        })
    }
    catch(err){
        console.log(err)
    }
}

const GetUserfromGroupId=async (req,res)=>{

    try{
        let group=await GroupsModel.findAll({where:{id:req.params.id}})
        let users=await group[0].getUsers()
        // console.log(users)
        res.status(200).json({
            users:users,
            admin:[group[0].adminId,group[0].adminName]
        })
    }
    catch(err){
        res.status(404).json({
            error:err
        })
    }
}

const DeleteGroup=async (req,res)=>{
    try{
        let groupId=req.params.id
        let group=await GroupsModel.findAll({where:{id:groupId}})
        // await req.user.removeGroup(group)
        // console.log(group[0].adminId,req.user.id)

        if(group[0].adminId==req.user.id){
            await GroupsModel.destroy({where:{id:groupId}})
        }
        else{
            group[0].removeUser(req.user)
        }
    }
    catch(err){
        console.log(err)
        res.status(404).json({
            success:false
        })
    }
}
const DeleteUserFromGroup=async (req,res)=>{
//     try{
//         let groupId=req.params.id
//         await req.user.removeGroup({where:{id:groupId}})
//     }
//     catch(err){
//         console.log(err)
//     }
}


module.exports={CreateGroup,GetGroups,DeleteUserFromGroup,DeleteGroup,AddUserToGroup,GetUserfromGroupId}