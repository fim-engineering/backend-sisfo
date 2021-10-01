'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn('Identities', 'hoby', 'hobby');
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn('Identities', 'hobby', 'hoby');
  }
};
