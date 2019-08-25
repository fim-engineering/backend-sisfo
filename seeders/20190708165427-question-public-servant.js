'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
     
      {
        id:25,
        headline: null,
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Tuliskan 3 aktivitas dan/atau pencapaian terbaik  dalam konteks aktivitas saat ini yang telah Anda raih. Aktivitas dan pencapaian di sini diartikan dalam arti yang luas, bisa jadi berupa proyek yang ditangani, kajian kebijakan yang telah dilakukan ",
        TunnelId: 6,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "Nama Aktivitas 1/ Pencapaian 1": "text",
          "Penyelenggara": "text",
          "Waktu Mulai": "date",
          "Waktu Selesai": "date",
          "Durasi": "number",
          "Scope/Wilayah": "text",
          "Peran/ Prestasi": "text",
          "No. Telpon Ketua/ Penanggung Jawab": "text",
          "Alasan mengapa aktivitas / pencapaian ini merupaka yang terbaik bagi Anda ? (max. 350 kata)": "textarea"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:26,
        headline: null,
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Sebutkan dan Jelaskan aktivitas dan/atau pencapaian terbaik 2",
        TunnelId: 6,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "Nama Aktivitas 2/ Pencapaian 2": "text",
          "Penyelenggara": "text",
          "Waktu Mulai": "date",
          "Waktu Selesai": "date",
          "Durasi": "number",
          "Scope/Wilayah": "text",
          "Peran/ Prestasi": "text",
          "No. Telpon Ketua/ Penanggung Jawab": "text",
          "Alasan mengapa aktivitas / pencapaian ini merupaka yang terbaik bagi Anda ? (max. 350 kata)": "textarea"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:27,
        headline: null,
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Sebutkan dan Jelaskan aktivitas dan/atau pencapaian terbaik 3",
        TunnelId: 6,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "Nama Aktivitas 3/ Pencapaian 3": "text",
          "Penyelenggara": "text",
          "Waktu Mulai": "date",
          "Waktu Selesai": "date",
          "Durasi": "number",
          "Scope/Wilayah": "text",
          "Peran/ Prestasi": "text",
          "No. Telpon Ketua/ Penanggung Jawab": "text",
          "Alasan mengapa aktivitas / pencapaian ini merupaka yang terbaik bagi Anda ? (max. 350 kata)": "textarea"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:28,
        headline: "Essai",
        note: "(maksimal 400 kata)",
        question: "Tema : bagaimana FIM bisa membantu Anda untuk meningkatkan kualitas diri Anda secara personal sehingga mampu memberikan keuntungan untuk masyarakat (maksimal 400 kata)",
        TunnelId: 6,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({ "Essai": "textarea" }),
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
