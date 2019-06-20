

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define('Material', {
    name: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    user_submit: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    identifier_name: DataTypes.STRING
  }, {});
  Material.associate = function(models) {
    models.Material.belongsToMany(models.Product, {through:models.ProductMaterial,foreignKey:'materialId'});
    // associations can be defined here
    // Material.belongsToMany(models.Product, {      
    //   trough: 'ProductMaterials'
    // });
  };

  return Material;
};