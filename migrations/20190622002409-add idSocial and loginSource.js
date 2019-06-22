'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.addColumn('Users', 'socialId', {type: Sequelize.STRING}),
      queryInterface.addColumn('Users', 'loginSource', {type: Sequelize.STRING}),
      queryInterface.addColumn('Users', 'profilPicture', {type: Sequelize.STRING}),
    ])
  },

  down: (queryInterface, Sequelize) => {
   return Promise.all([
      queryInterface.removeColumn('Users', 'socialId'),
      queryInterface.removeColumn('Users', 'loginSource'),
      queryInterface.removeColumn('Users', 'profilPicture'),
    ])
  }
};
