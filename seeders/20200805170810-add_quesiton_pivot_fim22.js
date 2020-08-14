'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tunnelQuestions', [
      { id: 100, TunnelId: 9, QuestionId: 36, createdAt: new Date(), updatedAt: new Date() },
      { id: 101, TunnelId: 10, QuestionId: 36, createdAt: new Date(), updatedAt: new Date() },
      { id: 102, TunnelId: 11, QuestionId: 36, createdAt: new Date(), updatedAt: new Date() },
      { id: 103, TunnelId: 9, QuestionId: 37, createdAt: new Date(), updatedAt: new Date() },
      { id: 104, TunnelId: 10, QuestionId: 37, createdAt: new Date(), updatedAt: new Date() },
      { id: 105, TunnelId: 11, QuestionId: 37, createdAt: new Date(), updatedAt: new Date() },
      { id: 106, TunnelId: 9, QuestionId: 38, createdAt: new Date(), updatedAt: new Date() },
      { id: 107, TunnelId: 10, QuestionId: 38, createdAt: new Date(), updatedAt: new Date() },
      { id: 108, TunnelId: 11, QuestionId: 38, createdAt: new Date(), updatedAt: new Date() },
      { id: 109, TunnelId: 9, QuestionId: 39, createdAt: new Date(), updatedAt: new Date() },
      { id: 110, TunnelId: 10, QuestionId: 39, createdAt: new Date(), updatedAt: new Date() },
      { id: 111, TunnelId: 11, QuestionId: 39, createdAt: new Date(), updatedAt: new Date() },
      { id: 112, TunnelId: 9, QuestionId: 40, createdAt: new Date(), updatedAt: new Date() },
      { id: 113, TunnelId: 10, QuestionId: 40, createdAt: new Date(), updatedAt: new Date() },
      { id: 114, TunnelId: 11, QuestionId: 40, createdAt: new Date(), updatedAt: new Date() },
      { id: 115, TunnelId: 9, QuestionId: 41, createdAt: new Date(), updatedAt: new Date() },
      { id: 116, TunnelId: 10, QuestionId: 41, createdAt: new Date(), updatedAt: new Date() },
      { id: 117, TunnelId: 11, QuestionId: 41, createdAt: new Date(), updatedAt: new Date() },
      { id: 118, TunnelId: 9, QuestionId: 42, createdAt: new Date(), updatedAt: new Date() },
      { id: 119, TunnelId: 10, QuestionId: 42, createdAt: new Date(), updatedAt: new Date() },
      { id: 120, TunnelId: 11, QuestionId: 42, createdAt: new Date(), updatedAt: new Date() },
      { id: 121, TunnelId: 9, QuestionId: 43, createdAt: new Date(), updatedAt: new Date() },
      { id: 122, TunnelId: 10, QuestionId: 43, createdAt: new Date(), updatedAt: new Date() },
      { id: 123, TunnelId: 11, QuestionId: 43, createdAt: new Date(), updatedAt: new Date() },
      { id: 124, TunnelId: 9, QuestionId: 44, createdAt: new Date(), updatedAt: new Date() },
      { id: 125, TunnelId: 10, QuestionId: 44, createdAt: new Date(), updatedAt: new Date() },
      { id: 126, TunnelId: 11, QuestionId: 44, createdAt: new Date(), updatedAt: new Date() },
      { id: 127, TunnelId: 9, QuestionId: 45, createdAt: new Date(), updatedAt: new Date() },
      { id: 128, TunnelId: 10, QuestionId: 45, createdAt: new Date(), updatedAt: new Date() },
      { id: 129, TunnelId: 11, QuestionId: 45, createdAt: new Date(), updatedAt: new Date() },
      { id: 130, TunnelId: 9, QuestionId: 46, createdAt: new Date(), updatedAt: new Date() },
      { id: 131, TunnelId: 10, QuestionId: 46, createdAt: new Date(), updatedAt: new Date() },
      { id: 132, TunnelId: 11, QuestionId: 46, createdAt: new Date(), updatedAt: new Date() },
      { id: 133, TunnelId: 9, QuestionId: 47, createdAt: new Date(), updatedAt: new Date() },
      { id: 134, TunnelId: 10, QuestionId: 47, createdAt: new Date(), updatedAt: new Date() },
      { id: 135, TunnelId: 11, QuestionId: 47, createdAt: new Date(), updatedAt: new Date() },
      { id: 136, TunnelId: 9, QuestionId: 48, createdAt: new Date(), updatedAt: new Date() },
      { id: 137, TunnelId: 10, QuestionId: 48, createdAt: new Date(), updatedAt: new Date() },
      { id: 138, TunnelId: 11, QuestionId: 48, createdAt: new Date(), updatedAt: new Date() },
      { id: 139, TunnelId: 9, QuestionId: 49, createdAt: new Date(), updatedAt: new Date() },
      { id: 140, TunnelId: 10, QuestionId: 49, createdAt: new Date(), updatedAt: new Date() },
      { id: 141, TunnelId: 11, QuestionId: 49, createdAt: new Date(), updatedAt: new Date() },
      { id: 142, TunnelId: 9, QuestionId: 50, createdAt: new Date(), updatedAt: new Date() },
      { id: 143, TunnelId: 10, QuestionId: 50, createdAt: new Date(), updatedAt: new Date() },
      { id: 144, TunnelId: 11, QuestionId: 50, createdAt: new Date(), updatedAt: new Date() },
      { id: 145, TunnelId: 9, QuestionId: 51, createdAt: new Date(), updatedAt: new Date() },
      { id: 146, TunnelId: 10, QuestionId: 51, createdAt: new Date(), updatedAt: new Date() },
      { id: 147, TunnelId: 11, QuestionId: 51, createdAt: new Date(), updatedAt: new Date() },      
      { id: 149, TunnelId: 10, QuestionId: 52, createdAt: new Date(), updatedAt: new Date() },
      { id: 150, TunnelId: 11, QuestionId: 53, createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('tunnelQuestions', {id: {$between: [100,150]}}, {})
  }
};
