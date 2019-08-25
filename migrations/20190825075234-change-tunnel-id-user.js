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
      queryInterface.renameColumn('Answers', 'tunnelId', 'TunnelId'),
      queryInterface.renameColumn('Questions', 'tunnelId', 'TunnelId'),
      queryInterface.renameColumn('tunnelQuestions', 'tunnelId', 'TunnelId')
    ])


  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.renameColumn('Answers', 'TunnelId', 'tunnelId'),
      queryInterface.renameColumn('Questions', 'TunnelId', 'tunnelId'),
      queryInterface.renameColumn('tunnelQuestions', 'TunnelId', 'tunnelId')
    ])
  }
};
