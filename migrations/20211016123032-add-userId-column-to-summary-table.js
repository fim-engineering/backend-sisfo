'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Summaries','userId', { type:Sequelize.INTEGER })
    .then(() => queryInterface.addIndex('Summaries', ['userId']))
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Summaries','userId')
  }
};
