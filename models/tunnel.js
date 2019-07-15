'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tunnel = sequelize.define('Tunnel', {
    name: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    description:DataTypes.TEXT,
    urlPicture:DataTypes.STRING
  }, {});
  Tunnel.associate = function(models) {
    models.Tunnel.belongsToMany(models.Identity, {through: models.Summary, foreignKey: 'tunnelId'});
    models.Tunnel.belongsToMany(models.Question,{through:models.tunnelQuestion,foreignKey:'tunnelId'});
  };
  return Tunnel;
};