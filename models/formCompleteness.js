'use strict';

module.exports = (sequelize, DataTypes) => {
  const formCompleteness = sequelize.define('FormCompleteness', {
    userId: DataTypes.INTEGER,
    fimBatch: DataTypes.STRING,
    isFirstStepCompleted: DataTypes.BOOLEAN,
    isSecondStepCompleted: DataTypes.BOOLEAN,
    isThirdStepCompleted: DataTypes.BOOLEAN,
    isFourthStepCompleted: DataTypes.BOOLEAN,
    submittedAt: DataTypes.DATE,
  }, {
    freezeTableName: true,
    name: {
      singular: 'FormCompleteness',
      plural: 'FormCompleteness',
    }
  }, {});

  formCompleteness.associate = function (models) {
    models.FormCompleteness.belongsTo(models.User, { foreignKey: 'userId' })
    models.FormCompleteness.belongsTo(models.Identity, { foreignKey: 'userId', targetKey: 'userId' })
    models.User.hasOne(models.Skill, { foreignKey: 'userId' })
    models.User.hasOne(models.SocialMedia, { foreignKey: 'userId' })
    models.User.hasOne(models.AlumniReference, { foreignKey: 'userId' })
    models.User.hasOne(models.FimActivity, { foreignKey: 'userId' })
    models.User.hasOne(models.PersonalDocument, { foreignKey: 'userId' })
    models.User.hasMany(models.OrganizationExperience, { foreignKey: 'userId' })
  };

  return formCompleteness;
};