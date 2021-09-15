'use strict';
module.exports = (sequelize, DataTypes) => {
  const ParticipantRecruiter = sequelize.define('ParticipantRecruiter', {
    ktpNumber: DataTypes.STRING,
    recruiterId: DataTypes.INTEGER,
    emailRecruiter: DataTypes.STRING,
    nameRecruiter: DataTypes.STRING,
  }, {});
  ParticipantRecruiter.associate = function(models) {
    models.ParticipantRecruiter.belongsTo(models.User, { foreignKey: 'recruiterId', targetKey: 'id' });
  };
  return ParticipantRecruiter;
};

