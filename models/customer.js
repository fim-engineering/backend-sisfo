'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    dateofbirth: DataTypes.DATE,
    flag: DataTypes.STRING,
    profilpicture: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    loginSource:DataTypes.STRING,
    idSocialmedia:DataTypes.STRING,
    identifier_name: DataTypes.STRING
  }, {});
  Customer.associate = function(models) {
    // associations can be defined here
  };
  return Customer;
};