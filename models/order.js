'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    CustomerId: DataTypes.INTEGER,
    invoiceNumber:DataTypes.INTEGER,
    companyId:DataTypes.INTEGER,
    transactionId:DataTypes.STRING,
    addressId: DataTypes.INTEGER,
    bankId: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    // price: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    // diskon: DataTypes.INTEGER,
    kode_unik: DataTypes.INTEGER,
    address: DataTypes.STRING,
    // province_id: DataTypes.STRING,
    // city_id: DataTypes.STRING,
    // subdistrict_id: DataTypes.STRING,
    courier: DataTypes.STRING,
    etd: DataTypes.STRING,
    value: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    expireDate:DataTypes.DATE,
    no_resi: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    confirmBy: DataTypes.STRING,
    dateconfirm: DataTypes.DATE,
    prosesBy: DataTypes.STRING,
    dateproses: DataTypes.DATE,
    sendBy: DataTypes.STRING,
    datesend: DataTypes.DATE,
    receivedBy: DataTypes.STRING,
    datereceived: DataTypes.DATE,
    identifier_name: DataTypes.STRING,
    paymentDate:DataTypes.DATE

  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    models.Order.belongsTo(models.StatusOrder, {foreignKey:'status'});    
    models.Order.belongsTo(models.Bank, {foreignKey:'bankId'});
    models.Order.belongsTo(models.Address_Customer, {foreignKey:'addressId'});
    models.Order.belongsTo(models.Customer, {foreignKey:'CustomerId'});
    models.Order.belongsTo(models.Company, {foreignKey:'companyId',targetKey: 'companyIdBLST'});
    models.Order.hasMany(models.OrderProduct);

  };
  return Order;
};