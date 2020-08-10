'use strict';

module.exports = (sequelize, DataTypes) => {
  const Regional = sequelize.define('Regional', {
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    city: DataTypes.STRING,    
    province: DataTypes.STRING,
    logo_url:DataTypes.STRING,
    description:DataTypes.TEXT,
    createdBy: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  Regional.associate = function (models) {
    models.Regional.hasMany(models.User, {foreignKey:'RegionalId',sourceKey:'id'})
  };

  return Regional;
};