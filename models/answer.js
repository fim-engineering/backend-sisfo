'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answer: DataTypes.TEXT,
    ktpNumber: DataTypes.STRING,
    tunnelId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    questionId:DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    models.Answer.belongsTo(models.Tunnel, { foreignKey: 'id', sourceKey: 'tunnelId' })
    models.Answer.belongsTo(models.Question, { foreignKey: 'id', sourceKey: 'questionId' })
  };
  return Answer;
};