const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')
const  cors=require('cors')
require('dotenv').config()

const sequelize=require('./util/database')

const User=require('./models/user')

const app=express()
app.use(bodyParser.json())
app.use(cors())

const UserRouter=require('./routers/user')


app.use('/user',UserRouter)








// sequelize.sync({force:true})
sequelize.sync()
.then(res=>{
    app.listen(process.env.PORT || 3000)
})








