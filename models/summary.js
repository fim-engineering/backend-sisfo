'use strict';
module.exports = (sequelize, DataTypes) => {
  const Summary = sequelize.define('Summary', {
    ktpNumber: DataTypes.STRING,
    tunnelId: DataTypes.INTEGER,
    batchFim: DataTypes.STRING,
    isFinal: DataTypes.INTEGER,
    recruiterId: DataTypes.INTEGER,
    scoreFinal: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER
  }, {});
  Summary.associate = function(models) {
    // associations can be defined here
  };
  return Summary;
};