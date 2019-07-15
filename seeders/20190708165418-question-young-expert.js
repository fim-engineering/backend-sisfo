'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        id:22,
        headline: "Aktivitas dan Pencapaian",
        note: null,
        question: "Sebutkan dan jelaskan tentang portofolio riset/bisnis yang  Anda geluti ",
        tunnelId: 5,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "Nama Lembaga": "text",
          "Jabatan / posisi / peran": "text",
          "Nama rekan kerja": "text",
          "Nomor hp rekan kerja": "text",
          "Deskripsi singkat peran dan tanggung jawab yang Anda kerjakan": "text",
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:23,
        headline: null,
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Sebutkan 1 aktivitas dan/atau pencapaian terbaik dalam konteks aktivitas saat ini yang telah Anda raih. Aktivitas dan pencapaian di sini diartikan dalam arti yang luas, bisa jadi berupa pengalaman mendirikan usaha, menjuarai kompetisi, partisipasi dalam suatu konferensi, penulisan ilmiah, dll.",
        tunnelId: 5,
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
          "Alasan mengapa aktivitas / pencapaian ini merupaka yang terbaik bagi Anda ? (max. 350 kata)": "text"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:24,
        headline: "Portfolio",
        note: null,
        question: "Sertakan portofolio tulisan/artikel/jurnal yang telah Anda buat. Silahkan tuliskan link nya di bawah ini.",
        tunnelId: 5,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "URL Portfolio": "text",
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
