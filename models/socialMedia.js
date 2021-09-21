'use strict';

module.exports = (sequelize, DataTypes) => {
  const socialMedia = sequelize.define('SocialMedia', {
    userId: DataTypes.INTEGER,
    instagramUrl: DataTypes.STRING,
    twitterUrl: DataTypes.STRING,
    facebookUrl: DataTypes.STRING,
    websiteUrl: DataTypes.STRING,
    otherSiteUrl: DataTypes.STRING,
  }, {
    name: {
      singular: 'SocialMedia',
      plural: 'SocialMedia',
    }
  }, {});

  socialMedia.associate = function (models) {
    models.SocialMedia.belongsTo(models.User, { foreignKey: 'userId' })
  };

  return socialMedia;
};