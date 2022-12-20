const messageModel=require('../models/messages')
const {Op}=require('sequelize')
const GroupModel=require('../models/chatGroups')

const PostMessage=async (req,res)=>{
    try{
        await req.user.createMessage({
            message:req.body.message,
            userName:req.user.name,
            groupId:req.body.id
        })
        res.status(200).json({
            success:true
        })
    }
    catch(err){
        console.log(err)
        res.status(404).json({
            success:false
        })
    }
}

const GetMessages=async (req,res)=>{

    try{
        let lastId=parseInt(req.query.lastId)
        console.log(lastId,req.query.groupId)
        let group=await GroupModel.findAll({where:{id:req.query.groupId}})
       let messages= await group[0].getMessages({where:{id:{[Op.gt]:lastId}}})
    //    console.log(messages)
    //    
    res.status(200).json(messages)
    }
    catch(err){
        console.log('message:-',err)
        res.status(404).json(err)
    }
}




module.exports={PostMessage,GetMessages}