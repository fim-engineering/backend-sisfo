'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [      
      {
        id:16,
        headline: "Proyek Kolaboratif",
        note:null,
        question: "Tuliskan rencana proyek yang akan kamu kolaborasikan bersama FIM ",
        tunnelId: 3,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          // "Pilih Jenis Proyek (Sosial, Pendidikan dan Budaya, Ekonomi dan Industri Kreatif, Sains dan Teknologi, Politik dan Kebijakan Publik)": "[{'option':'Sosial'},{'option':'Pendidikan dan Budaya'},{'option':'Ekonomi dan Industri Kreatif'},{'option':'Sains dan Teknologi'},{'option':'Politik dan Kebijakan Publik'}]",
          "Pilih Jenis Proyek (Sosial, Pendidikan dan Budaya, Ekonomi dan Industri Kreatif, Sains dan Teknologi, Politik dan Kebijakan Publik)": "text",
          "Apa peran kamu dalam proyek ini ?": "textarea",
          "Dimana proyek ini akan dilakukan ?":"text",
          "Apa yang dilakukan dalam proyek ini ?":"text",
          "Apa saja sumberdaya yang dibutuhkan untuk mengeksekusi proyek ini ?": "textarea",
          "Bagaimana FIM bisa meningkatkan nilai manfaat proyek ini ? (Min 100 kata)": "textarea",         
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },    
      {
        id:17,
        headline: "Pernyataan Komitmen",
        note:null,
        question: "Format Terlampir",
        tunnelId: 3,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "URL File": "text"
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
