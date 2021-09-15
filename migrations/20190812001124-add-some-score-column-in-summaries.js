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
      queryInterface.addColumn('Summaries', 'scoreDataDiri', { type: Sequelize.INTEGER }),
      queryInterface.addColumn('Summaries', 'scoreAktivitas', { type: Sequelize.INTEGER }),
      queryInterface.addColumn('Summaries', 'scoreProject', { type: Sequelize.INTEGER }),
      queryInterface.addColumn('Summaries', 'scoreOther', { type: Sequelize.INTEGER }),
      queryInterface.addColumn('Summaries', 'notes', { type: Sequelize.TEXT }),
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
      queryInterface.removeColumn('Summaries', 'scoreDataDiri'),
      queryInterface.removeColumn('Summaries', 'scoreAktivitas'),
      queryInterface.removeColumn('Summaries', 'scoreProject'),
      queryInterface.removeColumn('Summaries', 'scoreOther'),
      queryInterface.removeColumn('Summaries', 'notes'),
    ])
  }
};
