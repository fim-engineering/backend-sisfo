

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cartproduct = sequelize.define('Cartproduct', {
    cartId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    identifier_name: DataTypes.STRING
  }, {});
  Cartproduct.associate = function(models) {
    // associations can be defined here
  };
  return Cartproduct;
};