

'use strict';

module.exports = (sequelize, DataTypes) => {
  const ProductMaterial = sequelize.define('ProductMaterial', {
    productId: DataTypes.INTEGER,
    materialId: DataTypes.INTEGER,
    identifier_name: DataTypes.STRING
  }, {});
  ProductMaterial.associate = function(models) {
    // associations can be defined here
  };
  return ProductMaterial;
};