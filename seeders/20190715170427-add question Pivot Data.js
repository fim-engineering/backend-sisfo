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
      { id: 1, tunnelId: 1, questionId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, tunnelId: 1, questionId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, tunnelId: 1, questionId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, tunnelId: 1, questionId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, tunnelId: 1, questionId: 34, createdAt: new Date(), updatedAt: new Date() },
      { id: 6, tunnelId: 2, questionId: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: 7, tunnelId: 2, questionId: 6, createdAt: new Date(), updatedAt: new Date() },
      { id: 8, tunnelId: 2, questionId: 7, createdAt: new Date(), updatedAt: new Date() },
      { id: 9, tunnelId: 2, questionId: 8, createdAt: new Date(), updatedAt: new Date() },
      { id: 10, tunnelId: 2, questionId: 9, createdAt: new Date(), updatedAt: new Date() },
      { id: 11, tunnelId: 2, questionId: 10, createdAt: new Date(), updatedAt: new Date() },
      { id: 12, tunnelId: 2, questionId: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 13, tunnelId: 2, questionId: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 14, tunnelId: 2, questionId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 15, tunnelId: 2, questionId: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 16, tunnelId: 2, questionId: 14, createdAt: new Date(), updatedAt: new Date() },
      { id: 17, tunnelId: 2, questionId: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 18, tunnelId: 2, questionId: 34, createdAt: new Date(), updatedAt: new Date() },
      { id: 19, tunnelId: 3, questionId: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: 20, tunnelId: 3, questionId: 6, createdAt: new Date(), updatedAt: new Date() },
      { id: 21, tunnelId: 3, questionId: 7, createdAt: new Date(), updatedAt: new Date() },
      { id: 22, tunnelId: 3, questionId: 8, createdAt: new Date(), updatedAt: new Date() },
      { id: 23, tunnelId: 3, questionId: 9, createdAt: new Date(), updatedAt: new Date() },
      { id: 24, tunnelId: 3, questionId: 16, createdAt: new Date(), updatedAt: new Date() },
      { id: 25, tunnelId: 3, questionId: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 26, tunnelId: 3, questionId: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 27, tunnelId: 3, questionId: 17, createdAt: new Date(), updatedAt: new Date() },
      { id: 28, tunnelId: 3, questionId: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 29, tunnelId: 3, questionId: 14, createdAt: new Date(), updatedAt: new Date() },
      { id: 30, tunnelId: 3, questionId: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 31, tunnelId: 3, questionId: 34, createdAt: new Date(), updatedAt: new Date() },
      { id: 32, tunnelId: 4, questionId: 18, createdAt: new Date(), updatedAt: new Date() },
      { id: 33, tunnelId: 4, questionId: 19, createdAt: new Date(), updatedAt: new Date() },
      { id: 34, tunnelId: 4, questionId: 20, createdAt: new Date(), updatedAt: new Date() },
      { id: 35, tunnelId: 4, questionId: 21, createdAt: new Date(), updatedAt: new Date() },
      { id: 36, tunnelId: 4, questionId: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 37, tunnelId: 4, questionId: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 38, tunnelId: 4, questionId: 17, createdAt: new Date(), updatedAt: new Date() },
      { id: 39, tunnelId: 4, questionId: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 40, tunnelId: 4, questionId: 14, createdAt: new Date(), updatedAt: new Date() },
      { id: 41, tunnelId: 4, questionId: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 42, tunnelId: 4, questionId: 34, createdAt: new Date(), updatedAt: new Date() },
      { id: 43, tunnelId: 5, questionId: 22, createdAt: new Date(), updatedAt: new Date() },
      { id: 44, tunnelId: 5, questionId: 23, createdAt: new Date(), updatedAt: new Date() },
      { id: 45, tunnelId: 5, questionId: 24, createdAt: new Date(), updatedAt: new Date() },
      { id: 46, tunnelId: 5, questionId: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 47, tunnelId: 5, questionId: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 48, tunnelId: 5, questionId: 17, createdAt: new Date(), updatedAt: new Date() },
      { id: 49, tunnelId: 5, questionId: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 50, tunnelId: 5, questionId: 14, createdAt: new Date(), updatedAt: new Date() },
      { id: 51, tunnelId: 5, questionId: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 52, tunnelId: 5, questionId: 34, createdAt: new Date(), updatedAt: new Date() },
      { id: 53, tunnelId: 6, questionId: 18, createdAt: new Date(), updatedAt: new Date() },
      { id: 54, tunnelId: 6, questionId: 25, createdAt: new Date(), updatedAt: new Date() },
      { id: 55, tunnelId: 6, questionId: 26, createdAt: new Date(), updatedAt: new Date() },
      { id: 56, tunnelId: 6, questionId: 27, createdAt: new Date(), updatedAt: new Date() },
      { id: 57, tunnelId: 6, questionId: 28, createdAt: new Date(), updatedAt: new Date() },
      { id: 58, tunnelId: 6, questionId: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 59, tunnelId: 6, questionId: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 60, tunnelId: 6, questionId: 17, createdAt: new Date(), updatedAt: new Date() },
      { id: 61, tunnelId: 6, questionId: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 62, tunnelId: 6, questionId: 14, createdAt: new Date(), updatedAt: new Date() },
      { id: 63, tunnelId: 6, questionId: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 64, tunnelId: 6, questionId: 34, createdAt: new Date(), updatedAt: new Date() },
      { id: 65, tunnelId: 7, questionId: 29, createdAt: new Date(), updatedAt: new Date() },
      { id: 66, tunnelId: 7, questionId: 30, createdAt: new Date(), updatedAt: new Date() },
      { id: 67, tunnelId: 7, questionId: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 68, tunnelId: 7, questionId: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 69, tunnelId: 7, questionId: 17, createdAt: new Date(), updatedAt: new Date() },
      { id: 70, tunnelId: 7, questionId: 34, createdAt: new Date(), updatedAt: new Date() },
      { id: 71, tunnelId: 8, questionId: 31, createdAt: new Date(), updatedAt: new Date() },
      { id: 72, tunnelId: 8, questionId: 32, createdAt: new Date(), updatedAt: new Date() },
      { id: 73, tunnelId: 8, questionId: 33, createdAt: new Date(), updatedAt: new Date() },
      { id: 74, tunnelId: 8, questionId: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 75, tunnelId: 8, questionId: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 76, tunnelId: 8, questionId: 17, createdAt: new Date(), updatedAt: new Date() },
      { id: 77, tunnelId: 8, questionId: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 78, tunnelId: 8, questionId: 14, createdAt: new Date(), updatedAt: new Date() },
      { id: 79, tunnelId: 8, questionId: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 80, tunnelId: 8, questionId: 34, createdAt: new Date(), updatedAt: new Date() },
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
