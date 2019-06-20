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
    return queryInterface.bulkInsert('StatusOrders', [
    {
      statusName: 'Menunggu pembayaran',  
      color:'#ea9100',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      statusName: 'Pesanan diproses',
      color:'#1575d4',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      statusName: 'Sedang dikirim',
      color:'#20c160',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      statusName: 'Sampai tujuan',
      color: '#3acced',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      statusName: 'Pesanan dibatalkan',
      color:'#f0544b',
      createdAt: new Date(),
      updatedAt: new Date()
    }

      ]


      )
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
