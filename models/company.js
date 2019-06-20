'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    companyIdBLST: DataTypes.INTEGER,
    companyName: DataTypes.STRING,
    aboutus: DataTypes.TEXT,
    url: DataTypes.STRING,
    privacypolicy: DataTypes.STRING,
    privacystore: DataTypes.STRING,
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    logo: DataTypes.STRING,
    identifier_name: DataTypes.STRING,
    branchId:DataTypes.INTEGER,
    branchName:DataTypes.STRING,
    customer_name: DataTypes.STRING,
    identifier_customer: DataTypes.STRING,
    initial_invoice:DataTypes.STRING
  }, {});
  Company.associate = function(models) {
    // associations can be defined here   
    models.Company.hasMany(models.Order,{foreignKey:'companyId',targetKey: 'companyIdBLST'});
  };
  return Company;
};