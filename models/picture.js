// console.log(Product.autoIncrementAttribute);
// console.log(JSON.stringify(Object.keys(Product)))

'use strict';

module.exports = (sequelize, DataTypes) => {
const Picture = sequelize.define('Picture', {
  productId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    url_medium: DataTypes.STRING,
    url_small: DataTypes.STRING,
    alt: DataTypes.STRING,
    size: DataTypes.INTEGER,
    public_id: DataTypes.STRING,
    original_filename: DataTypes.STRING,
    signature: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    identifier_name: DataTypes.STRING
  }, {});

  // Picture.belongsTo(Product)

  Picture.associate = function(models) {
    
    // associations can be defined here
    // Picture.belongsTo(models.Product);
  };

  return Picture;
};