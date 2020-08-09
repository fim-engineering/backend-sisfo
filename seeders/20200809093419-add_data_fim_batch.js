'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Fimbatches', [
      {
        id:1,
        name: "20",
        date_start_registration:"2018-01-01",
        date_end_registration:"2018-01-01",
        date_event_start:"2018-01-01",
        date_event_end:"2018-01-01",
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        id:2,
        name: "21",
        date_start_registration:"2018-01-01",
        date_end_registration:"2018-01-01",
        date_event_start:"2018-01-01",
        date_event_end:"2018-01-01",
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        id:3,
        name: "22",
        date_start_registration:"2020-08-17",
        date_end_registration:"2020-09-17",
        date_event_start:"2020-10-29",
        date_event_end:"2020-11-29",
        createdAt: new Date(), 
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Fimbatches', {id: {$between: [1,3]}}, {})
  }
};
