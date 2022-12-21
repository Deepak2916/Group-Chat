const Sequelize=require('sequelize')

const sequelize=require('../util/database')

const message=sequelize.define('messages',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    message:{
        type:Sequelize.TEXT,
    },
    userName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    isFile:{
        type:Sequelize.BOOLEAN
    }
});

module.exports=message