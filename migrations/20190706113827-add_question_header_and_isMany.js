'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {   
    return Promise.all([
      queryInterface.addColumn('Questions', 'isMany', { type: Sequelize.INTEGER }),
      queryInterface.addColumn('Questions', 'header', { type: Sequelize.TEXT }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Questions', 'isMany'),
      queryInterface.removeColumn('Questions', 'header'),
    ])
  }
};
