'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Regionals', [
      {
        id:1,
        name:"Hore",
        city:"Bogor",
        province:"Jawa Barat",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:2,
        name:"Banda Aceh",
        city:"Banda Aceh",
        province:"Sumatera",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        name:"Lhokseumawe",
        city:"Lhokseumawe",
        province:"Sumatera",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
