const UserController=require('../controllers/user')
const express=require('express')
const router=express.Router()

router.post('/signup',UserController.POstUser)
router.post('/login',UserController.UserLogin)
router.get('/',UserController.GetUser)
router.delete('/delete',UserController.DeleteUser)

module.exports=router