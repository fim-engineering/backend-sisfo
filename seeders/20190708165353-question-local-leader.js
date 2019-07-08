'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        headline: null,
        question: "Hal apa saja yang sudah saudara lakukan untuk FIM regional domisili saudara ?",
        tunnelId: 1,
        createdBy: 1,
        batchFIM: "20",
        isMany: 0,
        header: JSON.stringify({"answer": "text"}),
        createdAt: new Date(),
        updatedAt: new Date()
      },      
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
