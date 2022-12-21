const MessageController=require('../controllers/messages')
const Authentication=require('../middleware/authenticate')
const express=require('express')
const multer=require('multer')
const router=express.Router()

const storage=multer.memoryStorage()
const upload=multer({storage:storage})

router.post('/Add',[Authentication.authenticate,upload.single('file')], MessageController.PostMessage)
router.get('/Get',MessageController.GetMessages)


module.exports=router