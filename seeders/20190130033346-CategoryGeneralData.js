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
    return queryInterface.bulkInsert('CategoryGenerals', [
      {
        name: 'Food and Beverage',
        icon: '-',
        description: null,
      },
      {
        name: 'Vaccines, Medicine & Feed Additive',
        icon: '-',
        description: null,
      },
      {
        name: 'Technology',
        icon: '-',
        description: null,
      },
      {
        name: 'Book',
        icon: '-',
        description: null,
      },
      {
        name: 'Seeds',
        icon: '-',
        description: null,
      },
      {
        name: 'Personal Care',
        icon: '-',
        description: null,
      },
      {
        name: 'Workingspace',
        icon: '-',
        description: null,
      },
      {
        name: 'Hotel & Convention',
        icon: '-',
        description: null,
      },
      {
        name: 'Training & Education',
        icon: '-',
        description: null,
      },
      {
        name: 'Natural Product',
        icon: '-',
        description: null,
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('CategoryGenerals', null, {});
  }
};
