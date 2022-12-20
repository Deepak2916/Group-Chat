const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')
const  cors=require('cors')
require('dotenv').config()

const sequelize=require('./util/database')

const User=require('./models/user')
const Message=require('./models/messages')
const Group=require('./models/chatGroups')
const GroupUsers=require('./models/groupUsers')

const app=express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname,'front-end')))
// app.use(express.static(path.join(__dirname,'script')))

const UserRouter=require('./routers/user')
const MessageRouter=require('./routers/messages')
const GroupsRouter=require('./routers/chatGroups')
const AdminRouter=require('./routers/adminUsers')

app.use('/user',UserRouter)
app.use('/message',MessageRouter)
app.use('/group',GroupsRouter)
app.use('/admin',AdminRouter)


app.use((req,res)=>{
    console.log(req.url)
    res.sendFile(path.join(__dirname,'front-end',`view/${req.url}`))
})


User.hasMany(Message)
Message.belongsTo(User)
Group.hasMany(Message,{constraints:true, onDelete:'CASCADE'})
Message.belongsTo(Group)

User.belongsToMany(Group,{through:GroupUsers})
Group.belongsToMany(User,{through:GroupUsers})


// sequelize.sync({force:true})
sequelize.sync()
.then(res=>{
    app.listen(process.env.PORT || 3000)
})








