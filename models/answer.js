'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answer: DataTypes.TEXT,
    ktpNumber: DataTypes.STRING,
    tunnelId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
  };
  return Answer;
};