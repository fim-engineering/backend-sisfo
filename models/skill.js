'use strict';

module.exports = (sequelize, DataTypes) => {
  const skill = sequelize.define('Skill', {
    userId: DataTypes.INTEGER,
    isAbleVideoEditing: DataTypes.BOOLEAN,
    videoEditingPortofolioUrl: DataTypes.STRING,
    firstCertificateUrl: DataTypes.STRING,
    secondCertificateUrl: DataTypes.STRING,
    thirdCertificateUrl: DataTypes.STRING,
  }, {});

  skill.associate = function (models) {
    models.Skill.belongsTo(models.User, { foreignKey: 'userId' })
  };

  return skill;
};