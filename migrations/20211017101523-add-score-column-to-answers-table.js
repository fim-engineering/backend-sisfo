'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Answers','score', { type:Sequelize.INTEGER })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Answers','score')
  }
};
