'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answer: DataTypes.TEXT,
    ktpNumber: DataTypes.STRING,
    TunnelId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    questionId:DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    models.Answer.belongsTo(models.Tunnel, { foreignKey: 'id', sourceKey: 'TunnelId' })
    models.Answer.belongsTo(models.Question, { sourceKey: 'questionId', targetKey: 'id' })
  };
  return Answer;
};