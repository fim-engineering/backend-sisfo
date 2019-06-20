'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address_Customer = sequelize.define('Address_Customer', {
    customerId: DataTypes.INTEGER,
    province_id: DataTypes.STRING,
    province:DataTypes.STRING,
    city_id: DataTypes.STRING,
    city:DataTypes.STRING,
    subdistrict_id: DataTypes.STRING,
    subdistrict:DataTypes.STRING,
    address1: DataTypes.TEXT,
    address2: DataTypes.TEXT,
    postal_code: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    label:DataTypes.STRING,
    isPrimary: DataTypes.INTEGER,
    shipTo:DataTypes.STRING,
    phone: DataTypes.STRING,
    identifier_name: DataTypes.STRING
  }, {});
  Address_Customer.associate = function(models) {
    // associations can be defined here
  };
  return Address_Customer;
};