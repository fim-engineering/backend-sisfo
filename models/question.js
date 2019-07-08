'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    headline:DataTypes.STRING,
    question: DataTypes.STRING,
    tunnelId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    batchFim: DataTypes.STRING,
    isMany:DataTypes.INTEGER,
    header: DataTypes.TEXT,
    note:DataTypes.STRING,
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
  };
  return Question;
};