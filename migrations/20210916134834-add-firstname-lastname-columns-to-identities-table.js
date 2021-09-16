'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Identities', 'firstName', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'lastName', { type: Sequelize.STRING })
    ])
    
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Identities', 'firstName'),
      queryInterface.removeColumn('Identities', 'lastName')
    ])
  }
};
