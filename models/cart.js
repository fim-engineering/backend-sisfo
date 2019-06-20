'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    CustomerId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
    identifier_name: DataTypes.STRING
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
     models.Cart.belongsToMany(models.Product,{through:models.Cartproduct,foreignKey:'cartId'});
  };
  return Cart;
};