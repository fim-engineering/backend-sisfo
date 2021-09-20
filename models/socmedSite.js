'use strict';

module.exports = (sequelize, DataTypes) => {
  const socmedSite = sequelize.define('SocmedSite', {
    userId: DataTypes.INTEGER,
    instagramUrl: DataTypes.STRING,
    twitterUrl: DataTypes.STRING,
    facebookUrl: DataTypes.STRING,
    websiteUrl: DataTypes.STRING,
    otherSiteUrl: DataTypes.STRING,
  }, {});

  socmedSite.associate = function (models) {
    models.SocmedSite.belongsTo(models.User, { foreignKey: 'userId' })
  };

  return socmedSite;
};