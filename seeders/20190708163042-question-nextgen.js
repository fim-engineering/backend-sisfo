'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        id:1,
        headline: null,
        note:null,
        question: "Hal apa saja yang sudah saudara lakukan untuk FIM regional domisili saudara ?",
        TunnelId: 1,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({"answer": "text"}),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:2,
        headline: null,
        note:null,
        question: "Berdasarkan pengalaman saudara selama 1 tahun di regional, apa saja yang perlu dilakukan/ ditingkatkan di regional dan bagaimana bentuk kontribusi saudara untuk mewujudkan hal tersebut ?",
        TunnelId: 1,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({"answer": "text"}),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        headline: null,
        note:null,
        question: "Mengapa anda perlu untuk diterima di Pelatnas FIM 21 ?",
        TunnelId: 1,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({"answer": "text"}),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:4,
        headline: null,
        note:null,
        question: "Pernyataan Komitmen",
        TunnelId: 1,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "Attachment": "file"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
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
   return queryInterface.bulkDelete('Questions', null, {});
  }
};
