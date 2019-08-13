'use strict';
module.exports = (sequelize, DataTypes) => {
  const Identity = sequelize.define('Identity', {
    userId: DataTypes.INTEGER,
    ktpNumber: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    ktpUrl: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,    
    headline: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    religion: DataTypes.STRING,
    bornPlace: DataTypes.STRING,
    bornDate: DataTypes.DATE,
    cityAddress: DataTypes.STRING,
    batchFim: DataTypes.STRING,
    provinceAddress: DataTypes.STRING,
    emergencyPhone: DataTypes.STRING,
    gender: DataTypes.STRING,
    bloodGroup: DataTypes.STRING,
    hoby: DataTypes.TEXT,
    expertise: DataTypes.STRING,
    institution:DataTypes.STRING,
    otherReligion:DataTypes.STRING,
    role:DataTypes.INTEGER  
}, {});
Identity.associate = function (models) {
  models.Identity.belongsTo(models.User, { foreignKey: 'userId' })
  models.Identity.belongsToMany(models.Tunnel, {through: models.Summary, foreignKey: 'ktpNumber'});
  models.Identity.hasMany(models.Summary, {foreignKey:'ktpNumber',sourceKey:'ktpNumber'})
  models.Identity.hasMany(models.Answer, {foreignKey:'ktpNumber',sourceKey:'ktpNumber'})
};
return Identity;
};