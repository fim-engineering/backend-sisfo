'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    transactionId: DataTypes.STRING,
    companyId:DataTypes.INTEGER,
    price:DataTypes.INTEGER,
    name:DataTypes.STRING,
    customerId:DataTypes.INTEGER,
    deletedAt:DataTypes.DATE,
    identifier_name: DataTypes.STRING
  }, {});
  OrderProduct.associate = function (models) {
    // associations can be defined here


    models.OrderProduct.belongsTo(models.Product, {foreignKey:'productId'} );
    models.OrderProduct.belongsTo(models.Order, {foreignKey:'orderId'});
    models.OrderProduct.belongsTo(models.Customer, {foreignKey:'customerId'});
    models.OrderProduct.belongsTo(models.Company, {foreignKey:'companyId'});

  };
  return OrderProduct;
};