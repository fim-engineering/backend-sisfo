'use strict';

module.exports = (sequelize, DataTypes) => {
  const Fimbatch = sequelize.define('Fimbatch', {
    name: DataTypes.STRING,
    date_start_registration: DataTypes.DATE,
    date_end_registration: DataTypes.DATE,
    date_event_start: DataTypes.DATE,
    date_event_end: DataTypes.DATE,
    leader: DataTypes.INTEGER,
    tagline: DataTypes.STRING
  }, {});
  Fimbatch.associate = function(models) {
  };
  return Fimbatch;
};

