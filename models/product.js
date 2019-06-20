
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    companyId: DataTypes.INTEGER,
    brancId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    category: DataTypes.INTEGER,
    name: DataTypes.STRING,

    //  {
    //   type: DataTypes.STRING,
    //   validate: {
    //     async nameCantSame(value) {
    //       let count = await Product.count({
    //         where: {
    //           name: {
    //             $eq: value
    //           }
    //         }
    //       });
    //       if (count > 0) {
    //         throw new Error
    //       }
    //     }
    //   }
    // },

    description: DataTypes.TEXT,
    base_price: DataTypes.INTEGER,
    weight: DataTypes.DOUBLE,
    isbn: DataTypes.STRING,
    status: DataTypes.STRING,
    height: DataTypes.DOUBLE,
    width: DataTypes.DOUBLE,
    version: DataTypes.STRING,
    sku: DataTypes.STRING,
    material: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    stok: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    publish_date: DataTypes.DATE,
    fabrication_version:DataTypes.INTEGER,
    thick:DataTypes.DOUBLE,
    deletedAt: DataTypes.DATE,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING,
    promoPrice: DataTypes.INTEGER,
    promoPercentage: DataTypes.INTEGER,
    identifier_name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    source_fin_publisher: DataTypes.INTEGER,
    source_fin_author: DataTypes.INTEGER,
    source_fin_sponsor: DataTypes.INTEGER,
    cost_of_goods_sold: DataTypes.INTEGER,
    add_value_price: DataTypes.INTEGER,
    royalti_percent: DataTypes.INTEGER,
    editor_product: DataTypes.STRING,
    layouter_product: DataTypes.STRING,
    desainer_product: DataTypes.STRING,
    manager_proyek: DataTypes.STRING,
    mou_data: DataTypes.DATE,
    identifier_name: DataTypes.STRING,
    sumFilled:DataTypes.INTEGER,
    pp:DataTypes.INTEGER,
    pb:DataTypes.INTEGER,
  }, {});

  // Product.hasMany(Picture);
  // Product.belongsTo(categoryGeneral,{foreignKey: 'category'});

//   console.log(User.autoIncrementAttribute)
  Product.associate = function(models) {
    // associations can be defined here
    
    models.Product.belongsTo(models.CategoryGenerals, {foreignKey:'category'});
    models.Product.belongsToMany(models.Material, {through:models.ProductMaterial,foreignKey:'productId'});
    models.Product.hasMany(models.Picture);
    models.Product.belongsToMany(models.Category, {through:models.ProductCategory,foreignKey:'productId'});
    models.Product.belongsToMany(models.Author,{through:models.ProductAuthors,foreignKey:'productId'});
    models.Product.belongsToMany(models.Cart,{through:models.Cartproduct,foreignKey:'productId'});
    models.Product.hasMany(models.OrderProduct);
    // Product.belongsToMany(models.Author, {        
    //     trough: 'ProductAuthors'
    // });
    // Product.belongsToMany(models.Category, {       
    //     trough: 'ProductCategory'
    // });

};

  return Product;
};