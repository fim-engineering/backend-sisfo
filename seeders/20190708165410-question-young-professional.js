'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        id:18,
        headline: "Aktivitas dan Pencapaian",
        note: null,
        question: "Tuliskan informasi tentang tempat Anda bekerja saat ini",
        tunnelId: 4,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "Nama Perusahaan": "text",
          "Jabatan / posisi": "text",
          "Nama rekan kerja": "text",
          "Nomor hp rekan kerja": "text",
          "Deskripsi singkat peran dan tanggung jawab yang Anda kerjakan": "text",
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:19,
        headline: "Aktivitas dan Pencapaian",
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Tuliskan 3 aktivitas dan/atau pencapaian terbaik  dalam konteks aktivitas saat ini yang telah Anda raih. Aktivitas dan pencapaian di sini diartikan dalam arti yang luas, bisa jadi berupa menjadi  project leader, promosi jabatan, menangani cabang baru, menangani bidang kerja baru, scope pekerjaan , penghargaan dari instansi dll.",
        tunnelId: 4,
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
        id:20,
        headline: null,
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Sebutkan dan Jelaskan aktivitas dan/atau pencapaian 2",
        tunnelId: 4,
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
          "Alasan mengapa aktivitas / pencapaian ini merupaka yang terbaik bagi Anda ? (max. 350 kata)": "text"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:21,
        headline: null,
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Sebutkan dan Jelaskan aktivitas dan/atau pencapaian 3",
        tunnelId: 4,
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
          "Alasan mengapa aktivitas / pencapaian ini merupaka yang terbaik bagi Anda ? (max. 350 kata)": "text"
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
