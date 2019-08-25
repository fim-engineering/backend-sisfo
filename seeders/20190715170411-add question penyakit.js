'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        id: 34,
        headline: "Dalam kurun waktu 2 minggu ini, seberapa sering/banyak Anda terganggu dengan masalah berikut ini",
        note: null,
        question: "0 = Tidak Pernah | 1 = Jarang / kurang dari 1 atau 2 hari | 2 = Beberapa hari | 3 = Lebih dari beberapa hari dalam seminggu | 4 =  Hampir setiap hari",
        TunnelId: 8,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "Kurang berminat melakukan sesuatu": "number",
          "Merasa down,tertekan, atau hopeless (tidak memiliki harapan)": "number",
          "Mudah merasa marah/kesal dari biasanya.": "number",
          "Waktu tidur lebih sedikit dari biasanya, tapi tetap memiliki energi yang banyak untuk beraktivitas": "number",
          "Memulai banyak aktivitas dari bisasanya atau melakaukan sesuatu yang berisiko dari biasanya.": "number",
          "Merasa cemas, gelisah, terancam, dan khawatir": "number",
          "Merasa panik dan tertekan/terancam": "number",
          "Menghindari situasi-situasi yang membuat Anda cemas/panik": "number",
          "Mengalami sakit fisik yang tidak dapat dijelaskan penyebabnya (sakit kepala, sakit punggung, sendi, perut, dll)": "number",
          "Merasa bahwa penyakit yang kamu derita tidak dapat ditangani secara serius": "number",
          "Berpikir untuk menyakiti diri sendiri": "number",
          "Mendengar sesuatu yang tidak didengar oleh orang lain, seperti suara-suara ketika tidak ada orang lain di sekitar kamu": "number",
          "Merasa bahwa orang lain dapat mengetahui isi pikiran kamu atau kamu dapat mendengar apa yang orang lain pikirkan.": "number",
          "Mengalami masalah tidur yang memengaruhi kualitas tidur secara keseluruhan.": "number",
          "Memiliki masalah memori seperti sulit mempelajari informasi baru atau sulit menemukan jalan pulang, dll": "number",
          "Memiliki pikiran, dorongan, dan gambaran yang tidak menyenangkan yang berulang kali yang masuk ke dalam pikiran.": "number",
          "Memiliki perasaan atas dorongan untuk melakukan tindakan-tindakan tertentu secara berulang, lagi- dan lagi": "number",
          "Merasa terpisah dari diri sendiri ( seperti: terpisah dari tubuh, lingkungan fisik dan atau ingatan kamu)": "number",
          "Tidak mengenal diri sendiri dan tidak mengetahui apa yang kamu inginkan dalam hidup kamu.": "number",
          "Tidak merasa dekat dengan orang lain dan atau tidak merasa nyaman berinteraksi dengan orang lain": "number",
          "Minum alkohol 4 kali dalam sehari": "number",
          "Merokok, vape, dan hal sejenisnya lebih banyak dari biasanya": "number",
          "Mengonsumsi obat-obatan (penghilang rasa sakit, penenang, obat tidur, dll) tanpa resep dokter, apabila menggunakan resep dokter menggunakan dosis yang lebih banyak dari biasanya. ": "number",
          "Apakah kamu mengetahui ketika tanda-tanda di atas akan muncul dan akan menganggu aktivitas kamu?": "number",
          "Ketika mengalami hal-hal di atas, apa yang kamu lakukan untuk mengatasinya sehingga tetap dapat beraktivitas seperti biasanya": "number",   
          "Apakah kamu membutuhkan teman cerita (seperti psikolog, teman sejawat, dokter, psikiater, dll) untuk berbagi mengenai hal-hal yang kamu rasakan/alami di atas?": "number",      
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
