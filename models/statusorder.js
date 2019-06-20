'use strict';
module.exports = (sequelize, DataTypes) => {
  const StatusOrder = sequelize.define('StatusOrder', {
    statusName: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    color:DataTypes.STRING,
    identifier_name: DataTypes.STRING
  }, {});
  StatusOrder.associate = function(models) {
    // associations can be defined here
    models.StatusOrder.hasMany(models.Order, {foreignKey:'status'});
  };
  return StatusOrder;
};