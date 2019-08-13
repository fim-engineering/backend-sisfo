'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [

      { id: 1, name: "User", createdAt: new Date(), updatedAt: new Date() }, 
      { id: 3, name: "Admin", createdAt: new Date(), updatedAt: new Date() },      
      { id: 2, name: "Recruiter", createdAt: new Date(), updatedAt: new Date() },      

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
