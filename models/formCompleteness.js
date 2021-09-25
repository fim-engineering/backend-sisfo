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
  };

  return formCompleteness;
};