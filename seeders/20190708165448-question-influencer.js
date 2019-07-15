'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        id:31,
        headline: "Aktivitas dan Pencapaian",
        note: null,
        question: "Sebutkan dan jelaskan 3 portofolio aktivitas, project kolaborasi terbaik yang pernah dilakukan, atau pun penghargaan yang telah Anda raih.",
        tunnelId: 8,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "Platform yang digunakan 1": "text",
          "Nama akun": "text",
          "Genre (Film, Komedi, Musik, Travel, Beauty, Food, Fashion, Lainnya )": "text",
          "Portofolio hasil karya terbaik (link)": "text",
          "Alasan memilih genre tersebut (max. 350 kata)": "textarea",
          "Penghargaan atas karya yang dibuat": "text"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:32,
        headline: null,
        note: null,
        question: "Sebutkan dan jelaskan portfolio ke 2",
        tunnelId: 8,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "Platform yang digunakan 2": "text",
          "Nama akun": "text",
          "Genre (Film, Komedi, Musik, Travel, Beauty, Food, Fashion, Lainnya )": "text",
          "Portofolio hasil karya terbaik (link)": "text",
          "Alasan memilih genre tersebut (max. 350 kata)": "textarea",
          "Penghargaan atas karya yang dibuat": "text"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:33,
        headline: null,
        note: null,
        question: "Sebutkan dan jelaskan portfolio ke 3",
        tunnelId: 8,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "Platform yang digunakan 3": "text",
          "Nama akun": "text",
          "Genre (Film, Komedi, Musik, Travel, Beauty, Food, Fashion, Lainnya )": "text",
          "Portofolio hasil karya terbaik (link)": "text",
          "Alasan memilih genre tersebut (max. 350 kata)": "textarea",
          "Penghargaan atas karya yang dibuat": "text"
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
