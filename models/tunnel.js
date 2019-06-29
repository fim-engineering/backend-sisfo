'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tunnel = sequelize.define('Tunnel', {
    name: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  }, {});
  Tunnel.associate = function(models) {
    // associations can be defined here
  };
  return Tunnel;
};