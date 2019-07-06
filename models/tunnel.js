'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tunnel = sequelize.define('Tunnel', {
    name: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  }, {});
  Tunnel.associate = function(models) {
    models.Tunnel.belongsToMany(models.Identity, {through: models.Summary, foreignKey: 'tunnelId'});
  };
  return Tunnel;
};