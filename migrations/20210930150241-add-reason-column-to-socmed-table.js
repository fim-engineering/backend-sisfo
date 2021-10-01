'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('SocialMedia', 'reason', { type: Sequelize.TEXT }),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('SocialMedia', 'reason'),
    ])
  }
};
