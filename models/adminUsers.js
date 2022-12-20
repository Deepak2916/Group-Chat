const  Sequelize  = require("sequelize");

const sequelize =require('../util/database')

const Admin=sequelize.define('admins',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    groupId:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    userId:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports=Admin