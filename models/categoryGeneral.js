

module.exports = (sequelize, DataTypes) => {
const CategoryGeneral = sequelize.define('CategoryGenerals',{
    'id' : {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    'name':{
        type: DataTypes.STRING,
        allowNull:false
    },
    'icon':{
        type: DataTypes.STRING,
        allowNull:false
    },
    'description': {
        type: DataTypes.TEXT,
        allowNull:true
    },   
},{
    timestamps:true,
    tableName: 'CategoryGenerals'
});

return CategoryGeneral;
};