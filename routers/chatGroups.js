const GroupController=require('../controllers/chatGroups')
const Authentication=require('../middleware/authenticate')
const express=require('express')
const router=express.Router()

router.post('/create',Authentication.authenticate,GroupController.CreateGroup)
router.get('/get',Authentication.authenticate,GroupController.GetGroups)
router.delete('/deleteGroup/:id',Authentication.authenticate,GroupController.DeleteGroup)
// router.delete('/deleteUser/:id',Authentication.authenticate,GroupController.DeleteGroup)
router.post('/addUser',GroupController.AddUserToGroup)
router.get('/getUsers/:id',GroupController.GetUserfromGroupId)

module.exports=router