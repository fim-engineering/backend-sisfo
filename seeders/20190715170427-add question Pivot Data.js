'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('tunnelQuestions', [
      { id: 1, TunnelId: 1, QuestionId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, TunnelId: 1, QuestionId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, TunnelId: 1, QuestionId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, TunnelId: 1, QuestionId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, TunnelId: 1, QuestionId: 34, createdAt: new Date(), updatedAt: new Date() },
      { id: 6, TunnelId: 2, QuestionId: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: 7, TunnelId: 2, QuestionId: 6, createdAt: new Date(), updatedAt: new Date() },
      { id: 8, TunnelId: 2, QuestionId: 7, createdAt: new Date(), updatedAt: new Date() },
      { id: 9, TunnelId: 2, QuestionId: 8, createdAt: new Date(), updatedAt: new Date() },
      { id: 10, TunnelId: 2, QuestionId: 9, createdAt: new Date(), updatedAt: new Date() },
      { id: 11, TunnelId: 2, QuestionId: 10, createdAt: new Date(), updatedAt: new Date() },
      { id: 12, TunnelId: 2, QuestionId: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 13, TunnelId: 2, QuestionId: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 14, TunnelId: 2, QuestionId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 15, TunnelId: 2, QuestionId: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 16, TunnelId: 2, QuestionId: 14, createdAt: new Date(), updatedAt: new Date() },
      { id: 17, TunnelId: 2, QuestionId: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 18, TunnelId: 2, QuestionId: 34, createdAt: new Date(), updatedAt: new Date() },
      { id: 19, TunnelId: 3, QuestionId: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: 20, TunnelId: 3, QuestionId: 6, createdAt: new Date(), updatedAt: new Date() },
      { id: 21, TunnelId: 3, QuestionId: 7, createdAt: new Date(), updatedAt: new Date() },
      { id: 22, TunnelId: 3, QuestionId: 8, createdAt: new Date(), updatedAt: new Date() },
      { id: 23, TunnelId: 3, QuestionId: 9, createdAt: new Date(), updatedAt: new Date() },
      { id: 24, TunnelId: 3, QuestionId: 16, createdAt: new Date(), updatedAt: new Date() },
      { id: 25, TunnelId: 3, QuestionId: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 26, TunnelId: 3, QuestionId: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 27, TunnelId: 3, QuestionId: 17, createdAt: new Date(), updatedAt: new Date() },
      { id: 28, TunnelId: 3, QuestionId: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 29, TunnelId: 3, QuestionId: 14, createdAt: new Date(), updatedAt: new Date() },
      { id: 30, TunnelId: 3, QuestionId: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 31, TunnelId: 3, QuestionId: 34, createdAt: new Date(), updatedAt: new Date() },
      { id: 32, TunnelId: 4, QuestionId: 18, createdAt: new Date(), updatedAt: new Date() },
      { id: 33, TunnelId: 4, QuestionId: 19, createdAt: new Date(), updatedAt: new Date() },
      { id: 34, TunnelId: 4, QuestionId: 20, createdAt: new Date(), updatedAt: new Date() },
      { id: 35, TunnelId: 4, QuestionId: 21, createdAt: new Date(), updatedAt: new Date() },
      { id: 36, TunnelId: 4, QuestionId: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 37, TunnelId: 4, QuestionId: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 38, TunnelId: 4, QuestionId: 17, createdAt: new Date(), updatedAt: new Date() },
      { id: 39, TunnelId: 4, QuestionId: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 40, TunnelId: 4, QuestionId: 14, createdAt: new Date(), updatedAt: new Date() },
      { id: 41, TunnelId: 4, QuestionId: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 42, TunnelId: 4, QuestionId: 34, createdAt: new Date(), updatedAt: new Date() },
      { id: 43, TunnelId: 5, QuestionId: 22, createdAt: new Date(), updatedAt: new Date() },
      { id: 44, TunnelId: 5, QuestionId: 23, createdAt: new Date(), updatedAt: new Date() },
      { id: 45, TunnelId: 5, QuestionId: 24, createdAt: new Date(), updatedAt: new Date() },
      { id: 46, TunnelId: 5, QuestionId: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 47, TunnelId: 5, QuestionId: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 48, TunnelId: 5, QuestionId: 17, createdAt: new Date(), updatedAt: new Date() },
      { id: 49, TunnelId: 5, QuestionId: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 50, TunnelId: 5, QuestionId: 14, createdAt: new Date(), updatedAt: new Date() },
      { id: 51, TunnelId: 5, QuestionId: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 52, TunnelId: 5, QuestionId: 34, createdAt: new Date(), updatedAt: new Date() },
      { id: 53, TunnelId: 6, QuestionId: 18, createdAt: new Date(), updatedAt: new Date() },
      { id: 54, TunnelId: 6, QuestionId: 25, createdAt: new Date(), updatedAt: new Date() },
      { id: 55, TunnelId: 6, QuestionId: 26, createdAt: new Date(), updatedAt: new Date() },
      { id: 56, TunnelId: 6, QuestionId: 27, createdAt: new Date(), updatedAt: new Date() },
      { id: 57, TunnelId: 6, QuestionId: 28, createdAt: new Date(), updatedAt: new Date() },
      { id: 58, TunnelId: 6, QuestionId: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 59, TunnelId: 6, QuestionId: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 60, TunnelId: 6, QuestionId: 17, createdAt: new Date(), updatedAt: new Date() },
      { id: 61, TunnelId: 6, QuestionId: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 62, TunnelId: 6, QuestionId: 14, createdAt: new Date(), updatedAt: new Date() },
      { id: 63, TunnelId: 6, QuestionId: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 64, TunnelId: 6, QuestionId: 34, createdAt: new Date(), updatedAt: new Date() },
      { id: 65, TunnelId: 7, QuestionId: 29, createdAt: new Date(), updatedAt: new Date() },
      { id: 66, TunnelId: 7, QuestionId: 30, createdAt: new Date(), updatedAt: new Date() },
      { id: 67, TunnelId: 7, QuestionId: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 68, TunnelId: 7, QuestionId: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 69, TunnelId: 7, QuestionId: 17, createdAt: new Date(), updatedAt: new Date() },
      { id: 70, TunnelId: 7, QuestionId: 34, createdAt: new Date(), updatedAt: new Date() },
      { id: 71, TunnelId: 8, QuestionId: 31, createdAt: new Date(), updatedAt: new Date() },
      { id: 72, TunnelId: 8, QuestionId: 32, createdAt: new Date(), updatedAt: new Date() },
      { id: 73, TunnelId: 8, QuestionId: 33, createdAt: new Date(), updatedAt: new Date() },
      { id: 74, TunnelId: 8, QuestionId: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 75, TunnelId: 8, QuestionId: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 76, TunnelId: 8, QuestionId: 17, createdAt: new Date(), updatedAt: new Date() },
      { id: 77, TunnelId: 8, QuestionId: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 78, TunnelId: 8, QuestionId: 14, createdAt: new Date(), updatedAt: new Date() },
      { id: 79, TunnelId: 8, QuestionId: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 80, TunnelId: 8, QuestionId: 34, createdAt: new Date(), updatedAt: new Date() },
    ], {});


  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('tunnelQuestions', null, {});
  }
};
