'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
    status: DataTypes.INTEGER,
    socialId: DataTypes.STRING,
    loginSource: DataTypes.STRING,
    profilPicture: DataTypes.STRING,
    TunnelId: DataTypes.INTEGER,
    RegionalId: DataTypes.INTEGER
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    models.User.hasOne(models.Identity, { foreignKey: 'userId' })
    models.User.belongsTo(models.Regional, { foreignKey: 'RegionalId' })
    models.User.belongsToMany(models.Summary, { through: models.ParticipantRecruiter, foreignKey: 'recruiterId' })

  };
  return User;
};