const  Sequelize  = require("sequelize");

const sequelize =require('../util/database')

const ChatGroup=sequelize.define('groups',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    adminName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    adminId:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports=ChatGroup