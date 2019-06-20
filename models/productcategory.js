

'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    productId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    identifier_name: DataTypes.STRING
  }, {});

  ProductCategory.associate = function(models) {
    // associations can be defined here
  };
  
  return ProductCategory;
};