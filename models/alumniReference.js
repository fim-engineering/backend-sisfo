'use strict';

module.exports = (sequelize, DataTypes) => {
  const alumniReference = sequelize.define('AlumniReference', {
    userId: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    batch: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    relationship: DataTypes.STRING,
    acquaintedSince: DataTypes.STRING,
  }, {});

  alumniReference.associate = function (models) {
    models.AlumniReference.belongsTo(models.User, { foreignKey: 'userId' })
  };

  return alumniReference;
};