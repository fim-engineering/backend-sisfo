'use strict';
module.exports = (sequelize, DataTypes) => {
  const University = sequelize.define('University', {
    name: DataTypes.STRING,
    website: DataTypes.STRING
  }, {});
  University.associate = function(models) {
    // associations can be defined here
  };
  return University;
};