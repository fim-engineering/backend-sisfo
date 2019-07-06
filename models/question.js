'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question: DataTypes.STRING,
    tunnelId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    batchFim: DataTypes.STRING,
    isMany:DataTypes.INTEGER,
    header: DataTypes.TEXT
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
  };
  return Question;
};