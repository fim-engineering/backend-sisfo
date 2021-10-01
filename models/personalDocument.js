'use strict';

module.exports = (sequelize, DataTypes) => {
  const personalDocument = sequelize.define('PersonalDocument', {
    userId: DataTypes.INTEGER,
    identityFileUrl: DataTypes.STRING,
    recommendationLetterUrl: DataTypes.STRING,
    commitmentLetterUrl: DataTypes.STRING
  }, {});

  personalDocument.associate = function (models) {
    models.PersonalDocument.belongsTo(models.User, { foreignKey: 'userId' })
  };

  return personalDocument;
};