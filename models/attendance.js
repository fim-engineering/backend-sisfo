'use strict';

module.exports = (sequelize, DataTypes) => {
  const attendance = sequelize.define('Attendance', {
    userId: DataTypes.INTEGER,
    batch: DataTypes.STRING,
    isAttend: DataTypes.BOOLEAN,
    reason: DataTypes.TEXT,
    reasonUrl: DataTypes.STRING
  }, {
    freezeTableName: true,
    name: {
      singular: 'Attendance',
      plural: 'Attendance',
    }
  }, {});

  attendance.associate = function (models) {
    models.Attendance.belongsTo(models.User, { foreignKey: 'userId' })
  };

  return attendance;
};