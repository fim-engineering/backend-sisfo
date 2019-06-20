

'use strict';

module.exports = (sequelize, DataTypes) => {
  const ProductPicture = sequelize.define('ProductPicture', {
    productId: DataTypes.INTEGER,
    pictureId: DataTypes.INTEGER,
    identifier_name: DataTypes.STRING
  }, {});
  ProductPicture.associate = function(models) {
    // associations can be defined here
  };
  return ProductPicture;
};