'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Identities', [

      { ktpNumber: "3673010208955001", name: "Mochammad Andrian Maulana", batchFim: "20", regional: "Pelatwil 1 - Bukittinggi", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "3604044307980013", name: "Elma Maratunnisa", batchFim: "20", regional: "Pelatwil 3", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "3205014503960005", name: "Intan Qonitah", batchFim: "20", regional: "Pelatwil 3", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "3312122008940002", name: "Muhammad Alif Pratama", batchFim: "20", regional: "Pelatwil 3", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "3674052105980003", name: "Andhika Firman Agung", batchFim: "20", regional: "Pelatwil 3", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "3209155507970007", name: "Nadya Safriana La Onda", batchFim: "20", regional: "Pelatwil 3", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "1371041202970005", name: "Muhammad Ghiffari Alfarisy", batchFim: "20", regional: "Pelatwil 3", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "3201011706950011", name: "Hikmah Bima Odityo", batchFim: "20", regional: "Pelatwil 3", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "3310165508950002", name: "Sri Kusumastuti", batchFim: "20", regional: "Pelatwil 3", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "3211011601970004", name: "Usep Taryana", batchFim: "20", regional: "Pelatwil 3", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "3204081605980007", name: "Muhamad Ababil Akram", batchFim: "20", regional: "Pelatwil 3", createdAt: new Date(), updatedAt: new Date() },
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
