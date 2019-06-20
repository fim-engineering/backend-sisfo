'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define('Bank', {
    companyId: DataTypes.INTEGER,
    bankname: DataTypes.STRING,
    an: DataTypes.STRING,
    norek: DataTypes.STRING,
    logo: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    identifier_name: DataTypes.STRING,
    branchId: DataTypes.INTEGER,
    bank_code: DataTypes.STRING,
    full_bank_name: DataTypes.STRING,
    full_name_bank: DataTypes.STRING
  }, {});
  Bank.associate = function(models) {
    // associations can be defined here
  };
  return Bank;
};