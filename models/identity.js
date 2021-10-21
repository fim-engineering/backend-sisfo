'use strict';

module.exports = (sequelize, DataTypes) => {
  const Identity = sequelize.define('Identity', {
    userId: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    emergencyPhone: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    ktpNumber: DataTypes.STRING,
    ktpUrl: DataTypes.STRING,
    headline: DataTypes.STRING,
    batchFim: DataTypes.STRING,
    religion: DataTypes.STRING,
    otherReligion: DataTypes.STRING,
    bornPlace: DataTypes.STRING,
    bornDate: DataTypes.DATE,
    address: DataTypes.TEXT,
    cityAddress: DataTypes.STRING,
    provinceAddress: DataTypes.STRING,
    gender: DataTypes.STRING,
    bloodGroup: DataTypes.STRING,
    hobby: DataTypes.TEXT,
    institution: DataTypes.STRING,
    occupation: DataTypes.STRING,
    role: DataTypes.INTEGER,
    reference_by: DataTypes.STRING,
    expertise: DataTypes.STRING,
    video_editing: DataTypes.STRING,
    status_accept: DataTypes.INTEGER,
    attendenceConfirmationDate: DataTypes.DATE,
    mbti: DataTypes.STRING,
    paymentDate: DataTypes.DATE,
    bankTransfer: DataTypes.STRING,
    urlTransferPhoto: DataTypes.STRING,
  }, {});

  Identity.associate = function (models) {
    models.Identity.belongsTo(models.User, { foreignKey: 'userId' })
    models.Identity.belongsToMany(models.Tunnel, { through: models.Summary, foreignKey: 'ktpNumber' });
    models.Identity.hasMany(models.FormCompleteness, { foreignKey: 'userId' })
    models.Identity.hasMany(models.Summary, { foreignKey: 'ktpNumber', sourceKey: 'ktpNumber' })
    models.Identity.hasMany(models.Answer, { foreignKey: 'ktpNumber', sourceKey: 'ktpNumber' })
    models.Identity.hasMany(models.ParticipantRecruiter, { foreignKey: 'ktpNumber', sourceKey: 'ktpNumber' });
  };

  return Identity;
};