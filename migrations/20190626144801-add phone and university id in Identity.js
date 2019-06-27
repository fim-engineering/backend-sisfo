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
      queryInterface.addColumn('Identities', 'phone', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'universityId', { type: Sequelize.INTEGER }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    return Promise.all([
      queryInterface.removeColumn('Identities', 'phone'),
      queryInterface.removeColumn('Identities', 'universityId'),
    ]);
  }
};
