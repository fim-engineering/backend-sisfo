'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartOrder = sequelize.define('CartOrder', {
    orderId: DataTypes.INTEGER,
    cartId: DataTypes.INTEGER,
    identifier_name: DataTypes.STRING
  }, {});
  CartOrder.associate = function(models) {
    // associations can be defined here
  };
  return CartOrder;
};