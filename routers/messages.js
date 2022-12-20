const MessageController=require('../controllers/messages')
const Authentication=require('../middleware/authenticate')
const express=require('express')
const router=express.Router()

router.post('/Add/:id',Authentication.authenticate,MessageController.PostMessage)
router.get('/Get',MessageController.GetMessages)


module.exports=router