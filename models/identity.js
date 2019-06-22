'use strict';
module.exports = (sequelize, DataTypes) => {
  const Identity = sequelize.define('Identity', {
    userId: DataTypes.INTEGER,
    ktpNumber: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    ktpUrl: DataTypes.STRING
  }, {});
  Identity.associate = function(models) {
    models.Identity.hasOne(models.User , { foreignKey: 'userId' })
  };
  return Identity;
};