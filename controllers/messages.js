const messageModel=require('../models/messages')
const {Op}=require('sequelize')
const S3Service=require('../services/s3Service')
const GroupModel=require('../models/chatGroups')
// const multer=require('multer')

const PostMessage=async (req,res)=>{
    try{
         let message= req.body.text
         let isFile=false
        if(req.file!=undefined){
            let type=req.file.mimetype.split('/')
            let fileType=type[1]
            // console.log('fileType,...',fileType)
            let file=req.file.buffer
            const filename=`groupChat/${req.user.id}/${new Date()}.${fileType}`;
            const fileUrl= await S3Service.uploadToS3(file,filename)
            message=fileUrl
            isFile=true
        }
        
            // console.log(message)
            await req.user.createMessage({
                message:message,
                userName:req.user.name,
                groupId:req.body.id,
                isFile:isFile
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
        // console.log(lastId,req.query.groupId)
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