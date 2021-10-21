'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users','role', { type: Sequelize.INTEGER, defaultValue: 1, allowNull: false })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users','role')
  }
};
