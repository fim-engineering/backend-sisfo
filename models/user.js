
module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User',{
    'id' : {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    'username':{
        type: DataTypes.STRING,
        allowNull:true
    },
    'email': {
        type: DataTypes.STRING,
        allowNull:false
    },
    'password': {
        type: DataTypes.STRING,
        allowNull:false
    },
    'status' : {
        type: DataTypes.STRING, 
        allowNull:true      
    },
    'phone' :{
        type : DataTypes.STRING,
        allowNull:true
    },
    'userlevel' : {
        type : DataTypes.INTEGER,
        allowNull:true
    },
    'address' :{
        type : DataTypes.TEXT,
        allowNull:true
    },
    'gender' :{
        type : DataTypes.STRING,
        allowNull:true
    },
    'city' :{
        type : DataTypes.STRING,
        allowNull:true
    },
    'province' :{
        type : DataTypes.STRING,
        allowNull:true
    },
    'country' : {
        type: DataTypes.STRING,
        allowNull: true
    },
    'about_me' : {
        type: DataTypes.TEXT,
        allowNull: true
    },
    'lat' : {
        type: DataTypes.TEXT,
        allowNull: true
    },
    'long' : {
        type: DataTypes.TEXT,
        allowNull: true
    },
    'keu_user_id' : {
        type: DataTypes.STRING,
        allowNull: true
    },
    'flag_del' : {
        type: DataTypes.STRING,
        allowNull: true
    },
    'companyId' : {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    'deletedAt' : {
        type:DataTypes.DATE,
        allowNull:true
    }

},{
    timestamps:true
});

return User;
};