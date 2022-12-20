const AdminController=require('../controllers/adminUser')
const express=require('express')
const router=express.Router()

router.post('/add',AdminController.MakeUserAdmin)
router.get('/get/:groupId',AdminController.GetAdminUsers)

module.exports=router 