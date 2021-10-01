'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn('Identities', 'name', 'fullName');
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn('Identities', 'fullName', 'name');
  }
};
