'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addIndex('Answers', ['createdBy'])
    queryInterface.addIndex('Answers', ['TunnelId'])
    queryInterface.addIndex('Answers', ['QuestionId'])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
