'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
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
      },
      {
        headline: "Video Profil",
        note: null,
        question: "Sertakan karya yang berisikan profil singkat diri Anda beserta alasan mengapa ingin bergabung dalam keluarga besar FIM. Karya dapat berupa video, tulisan blog, rekaman podcast, unggahan instagram atau lainnya sesuai dengan platform yang Anda gunakan. Bagi pendaftar jalur selain Influencer, tugas ini bersifat optional (sebagai nilai tambah). Silahkan tuliskan link nya di bawah ini. ",
        tunnelId: 8,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({ "URL Video": "text" }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        headline: "Surat Rekomendasi",
        note: "Format Terlampir",
        question: "Pada Jalur ini, rekomendasi ini dapat diberikan oleh siapapun, baik itu teman baik, dosen, tokoh masyarakat, pemuka adat, petinggi organisasi, petinggi partai politik, atau alumni FIM, siapa saja asalkan mengenal kamu dengan baik",
        tunnelId: 8,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({ "URL File": "text" }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        headline: "Pernyataan Komitmen",
        note: null,
        question: "Format Terlampir",
        tunnelId: 8,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "URL File": "text"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        headline: null,
        note: null,
        question: "Jika pernah, mohon sebutkan berapa kali Anda telah  mendaftar FIM ?",
        tunnelId: 2,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "FIM Ke-": "text",
          "Tahun": "number",
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        headline: null,
        note: null,
        question: "Pendaftaran FIM ke 2 ?",
        tunnelId: 2,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "FIM Ke-": "text",
          "Tahun": "number",
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        headline: null,
        note: null,
        question: "Pendaftaran FIM ke 3 ?",
        tunnelId: 2,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "FIM Ke-": "text",
          "Tahun": "number",
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
