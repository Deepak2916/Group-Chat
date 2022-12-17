const Sequelize=require('sequelize')


const sequelize=new Sequelize(process.env.DB_TABLE_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    dialect:'mysql',
    host:process.env.HOST
   
})

module.exports=sequelize