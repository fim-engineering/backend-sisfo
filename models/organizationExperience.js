'use strict';

module.exports = (sequelize, DataTypes) => {
  const organizationExperience = sequelize.define('OrganizationExperience', {
    userId: DataTypes.INTEGER,
    referencePerson: DataTypes.STRING,
    role: DataTypes.STRING,
    duration: DataTypes.STRING,
    eventScale: DataTypes.STRING,
    result: DataTypes.TEXT,
  }, {});

  organizationExperience.associate = function (models) {
    models.OrganizationExperience.belongsTo(models.User, { foreignKey: 'userId' })
  };

  return organizationExperience;
};