'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Identities', [
      { ktpNumber: "5272014909980001", name: "Rahmawati", batchFim: "20", regional: "Wilayah 4 - Malang", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "3578101007950005", name: "Dwi Arif Fiandita", batchFim: "20", regional: "Wilayah 4 - Malang", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "351534404940002", name: "Bahjah Ayu Bakta", batchFim: "20", regional: "Wilayah 4 - Malang", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "5371035410980001", name: "Anita Oktoviana L.P.G.M. Thomas", batchFim: "20", regional: "Wilayah 4 - Malang", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "5304212004920001", name: "Paskalis Apri Bau Bitin", batchFim: "20", regional: "Wilayah 4 - Malang", createdAt: new Date(), updatedAt: new Date() },
    
      { ktpNumber: "7312030401950001", name: "Handiswan, S.Pd.", batchFim: "20", regional: "Wilayah 5 - Makassar", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "7306166307980001", name: "Sri Yuliana Sari", batchFim: "20", regional: "Wilayah 5 - Makassar", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "3505035407960002", name: "Ulfiana Sandra Yulianingtyas", batchFim: "20", regional: "Wilayah 5 - Makassar", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "7201104801980001", name: "Annisa Ramadhani R", batchFim: "20", regional: "Wilayah 5 - Makassar", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "7271022409980002", name: "Maulana Syamsuri", batchFim: "20", regional: "Wilayah 5 - Makassar", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "7601025808990001", name: "Hijrana", batchFim: "20", regional: "Wilayah 5 - Makassar", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "7404100301940001", name: "Riswan", batchFim: "20", regional: "Wilayah 5 - Makassar", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "7109102605960001", name: "Sterne Giovani Kalundas", batchFim: "20", regional: "Wilayah 5 - Makassar", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "760401271196200",  name: "A. Muh. Asrul Mawardi", batchFim: "20", regional: "Wilayah 5 - Makassar", createdAt: new Date(), updatedAt: new Date() },      
      { ktpNumber: "7605027112970031", name: "Musrifah Aliyah", batchFim: "20", regional: "Wilayah 5 - Makassar", createdAt: new Date(), updatedAt: new Date() },
      { ktpNumber: "3603071104980009", name: "Moh Hifdil Furqon", batchFim: "20", regional: "Wilayah 5 - Makassar", createdAt: new Date(), updatedAt: new Date() },

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
