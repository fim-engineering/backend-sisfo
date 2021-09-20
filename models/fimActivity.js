'use strict';

module.exports = (sequelize, DataTypes) => {
  const fimActivity = sequelize.define('FimActivity', {
    userId: DataTypes.INTEGER,
    responsibility: DataTypes.STRING,
    role: DataTypes.STRING,
    duration: DataTypes.STRING,
    eventScale: DataTypes.STRING,
    result: DataTypes.TEXT,
  }, {});

  fimActivity.associate = function (models) {
    models.FimActivity.belongsTo(models.User, { foreignKey: 'userId' })
  };

  return fimActivity;
};