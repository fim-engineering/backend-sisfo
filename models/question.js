'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    headline:DataTypes.STRING,
    question: DataTypes.TEXT,
    TunnelId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    batchFim: DataTypes.STRING,
    isMany:DataTypes.INTEGER,
    header: DataTypes.TEXT,
    note:DataTypes.STRING,
  }, {});
  Question.associate = function(models) {
    models.Question.belongsToMany(models.Tunnel,{through:models.tunnelQuestion,foreignKey:'QuestionId'});
  };
  return Question;
};