

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    order: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER,
    storeID: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
    identifier_name: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    models.Category.belongsToMany(models.Product, {through:models.ProductCategory,foreignKey:'categoryId'});
    // associations can be defined here
    // Category.belongsTo(models.Product, {    
    //   trough: 'ProductCategories'
    // });
  };  
  return Category;
};
