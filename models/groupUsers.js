const  Sequelize  = require("sequelize");

const sequelize =require('../util/database')

const GroupUser=sequelize.define('group-users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
});

module.exports=GroupUser