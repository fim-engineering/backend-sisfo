'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('FimActivities', 'responsibility', { type: Sequelize.TEXT });
    queryInterface.changeColumn('FimActivities', 'role', { type: Sequelize.TEXT });
    queryInterface.changeColumn('OrganizationExperiences', 'role', { type: Sequelize.TEXT });
  },

  down: async (queryInterface, Sequelize) => {
    //
  }
};