'use strict';
module.exports = (sequelize, DataTypes) => {
  const tunnelQuestion = sequelize.define('tunnelQuestion', {
    TunnelId: DataTypes.INTEGER,
    QuestionId: DataTypes.INTEGER
  }, {});
  tunnelQuestion.associate = function(models) {
    // associations can be defined here
  };
  return tunnelQuestion;
};