'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Identities', 'occupation', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'instagram', { type: Sequelize.TEXT }),
      queryInterface.addColumn('Identities', 'twitter', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'facebook', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'website', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'reference_by', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'video_editing', { type: Sequelize.STRING }),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Identities', 'occupation'),
      queryInterface.removeColumn('Identities', 'instagram'),
      queryInterface.removeColumn('Identities', 'twitter'),
      queryInterface.removeColumn('Identities', 'facebook'),
      queryInterface.removeColumn('Identities', 'website'),
      queryInterface.removeColumn('Identities', 'reference_by'),
      queryInterface.removeColumn('Identities', 'video_editing'),
    ])
  }
};
