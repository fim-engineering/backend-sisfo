'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        id:29,
        headline: "Aktivitas dan Pencapaian",
        note: null,
        question: "Tuliskan informasi tentang tempat Anda menempuh pendidikan saat ini",
        TunnelId: 7,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "Nama Instansi": "text",         
          "Jabatan / pangkat": "text",
          "Nama rekan kerja": "text",
          "Nomor hp rekan kerja": "text",
          "Deskripsi singkat tentang pendidikan yang tengah/telah Anda jalani (maksimal 350 kata)": "textarea",
          "Deskripsi singkat peran dan tanggung jawab yang Anda kerjakan": "textarea"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:30,
        headline: null,
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Tuliskan 1 aktivitas dan/atau pencapaian terbaik  dalam konteks aktivitas saat ini yang telah Anda raih. Aktivitas dan pencapaian di sini diartikan dalam arti yang luas, bisa jadi berupa pengalaman organisasi, pengalaman kepanitiaan, pengalaman mendirikan organisasi,menjuarai kompetisi, partisipasi dalam suatu konferensi, penulisan ilmiah, dll ",
        TunnelId: 7,
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
