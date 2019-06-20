'use strict';
module.exports = (sequelize, DataTypes) => {
  const Slidebar = sequelize.define('Slidebar', {
    slidebar: DataTypes.TEXT,
    name: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    hyperlink: DataTypes.TEXT,
    order: DataTypes.INTEGER,
    DeletedAt: DataTypes.DATE,
    identifier_name: DataTypes.STRING
  }, {});
  Slidebar.associate = function(models) {
    // associations can be defined here
  };
  return Slidebar;
};