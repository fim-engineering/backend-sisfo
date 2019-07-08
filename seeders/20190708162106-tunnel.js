'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tunnels', [
      {
        id: 1,
        name: 'Next Gen',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:2,
        name: 'Campus Leader',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        name: 'Local Leader',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:4,
        name: 'Young Professional',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:5,
        name: 'Young Expert',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:6,
        name: 'Public Servant',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:7,
        name: 'Military',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:8,
        name: 'Influencer',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
     
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tunnels', null, {});
  }
};
