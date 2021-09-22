'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Questions', 'order', { type: Sequelize.INTEGER }),
      queryInterface.addColumn('Questions', 'category', { type: Sequelize.STRING })
    ]).then(() => queryInterface.addIndex('Questions', ['order']))
    
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Questions', 'order'),
      queryInterface.removeColumn('Questions', 'category')
    ])
  }
};
