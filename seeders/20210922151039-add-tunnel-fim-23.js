'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tunnels', [
      {
        id: 12,
        name: 'Alumni / Umum',
        description: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        urlPicture: null,
        batchFim: '23'
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tunnels', { batchFim: '23' }, {})
  }
};