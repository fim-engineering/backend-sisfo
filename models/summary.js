'use strict';
module.exports = (sequelize, DataTypes) => {
  const Summary = sequelize.define('Summary', {
    ktpNumber: DataTypes.STRING,
    tunnelId: DataTypes.INTEGER,
    batchFim: DataTypes.STRING,
    isFinal: DataTypes.INTEGER,
    recruiterId: DataTypes.INTEGER,
    scoreFinal: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    scoreDataDiri : DataTypes.INTEGER,
    scoreAktivitas : DataTypes.INTEGER,
    scoreProject : DataTypes.INTEGER,
    scoreOther : DataTypes.INTEGER,
    notes:DataTypes.TEXT
  }, {});
  Summary.associate = function(models) {
    models.Summary.belongsTo(models.Tunnel,{foreignKey:'id', sourceKey:'tunnelId'})
  };
  return Summary;
};