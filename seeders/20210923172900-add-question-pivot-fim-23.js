'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tunnelQuestions', [
      { id: 160, TunnelId: 12, QuestionId: 54, createdAt: new Date(), updatedAt: new Date() },
      { id: 161, TunnelId: 12, QuestionId: 55, createdAt: new Date(), updatedAt: new Date() },
      { id: 162, TunnelId: 12, QuestionId: 56, createdAt: new Date(), updatedAt: new Date() },
      { id: 163, TunnelId: 12, QuestionId: 57, createdAt: new Date(), updatedAt: new Date() },
      { id: 164, TunnelId: 12, QuestionId: 58, createdAt: new Date(), updatedAt: new Date() },
      { id: 165, TunnelId: 12, QuestionId: 59, createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('tunnelQuestions', {id: {$between: [160,165]}}, {})
  }
};