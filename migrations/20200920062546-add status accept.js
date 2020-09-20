'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Identities', 'status_accept', { type: Sequelize.INTEGER, defaultValue: 0 }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Identities', 'status_accept')
    ])
  }
};
