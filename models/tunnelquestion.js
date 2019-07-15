'use strict';
module.exports = (sequelize, DataTypes) => {
  const tunnelQuestion = sequelize.define('tunnelQuestion', {
    tunnelId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  tunnelQuestion.associate = function(models) {
    // associations can be defined here
  };
  return tunnelQuestion;
};