'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Identities', [

      { ktpNumber: "9109015808980004", name: "Frida Agustina Wabiser", batchFim: "20", regional: "Papua", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "9171054608990002", name: "Vicha Valenscha Womsiwor", batchFim: "20", regional: "Papua", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "9171036307990005", name: "Nada Indriyani", batchFim: "20", regional: "Papua", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "9171031601950001", name: "Sumaryono Ade Nugroho", batchFim: "20", regional: "Papua", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "9109016004980007", name: "Icen Tabuni", batchFim: "20", regional: "Papua", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "9171024107980017", name: "Zona wita citra", batchFim: "20", regional: "Papua", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "9111023112940002", name: "Muhamad Muchsin", batchFim: "20", regional: "Papua", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "9171014401900003", name: "Sari Anastasyah", batchFim: "20", regional: "Papua", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "9171036907980003", name: "Yuliani Rafidah", batchFim: "20", regional: "Papua", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "9103013012940002", name: "Ryzcky Purnama Setyawan", batchFim: "20", regional: "Papua", createdAt: new Date(), updatedAt: new Date() },

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
