
'use strict';

module.exports = (sequelize, DataTypes) => {

  const ProductAuthors = sequelize.define('ProductAuthors', {
    productId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    identifier_name: DataTypes.STRING
  }, {});
  ProductAuthors.associate = function(models) {
    // associations can be defined here
  };
  return ProductAuthors;
};