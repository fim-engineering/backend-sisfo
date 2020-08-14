'use strict';
module.exports = (sequelize, DataTypes) => {
  const ParticipantRecruiter = sequelize.define('ParticipantRecruiter', {
    ktpNumber: DataTypes.STRING,
    recruiterId: DataTypes.INTEGER    
  }, {});
  ParticipantRecruiter.associate = function(models) {
    models.ParticipantRecruiter.belongsTo(models.User, { foreignKey: 'recruiterId', targetKey: 'id' });
  };
  return ParticipantRecruiter;
};

