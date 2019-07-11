'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        headline: null,
        note:null,
        question: "Hal apa saja yang sudah saudara lakukan untuk FIM regional domisili saudara ?",
        tunnelId: 1,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({"answer": "text"}),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        headline: null,
        note:null,
        question: "Berdasarkan pengalaman saudara selama 1 tahun di regional, apa saja yang perlu dilakukan/ ditingkatkan di regional dan bagaimana bentuk kontribusi saudara untuk mewujudkan hal tersebut ?",
        tunnelId: 1,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({"answer": "text"}),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        headline: null,
        note:null,
        question: "Mengapa anda perlu untuk diterima di Pelatnas FIM 21 ?",
        tunnelId: 1,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({"answer": "text"}),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        headline: null,
        note:null,
        question: "Pernyataan Komitmen",
        tunnelId: 1,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "Attachment": "file"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        headline: "Kelas Paralel",
        question: "Berikut ini adalah daftar kelas untuk sesi paralel saat pelatihan FIM. Mohon berikan peringkat  1 (paling berminat) – 8 (paling tidak berminat), pada daftar kelas berikut;",
        tunnelId: 1,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "Literasi dan pendidikan": "number",
          "Budaya dan pariwisata": "number",
          "Digital dan teknologi": "number",
          "Agrokompleks": "number",
          "Kesehatan": "number",
          "Energi dan Lingkungan": "number",
          "Commmunity Development": "number",
          "Sociopreneur": "number",
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },


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
