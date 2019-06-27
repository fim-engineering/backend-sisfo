'use strict';
module.exports = (sequelize, DataTypes) => {
  const Identity = sequelize.define('Identity', {
    userId: DataTypes.INTEGER,
    ktpNumber: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    ktpUrl: DataTypes.STRING,
    email:DataTypes.STRING,
    phone: DataTypes.STRING,
    universityId: DataTypes.INTEGER
  }, {});
  Identity.associate = function(models) {
    models.Identity.belongsTo(models.User , { foreignKey: 'userId' })
  };
  return Identity;
};