'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        headline: "Aktivitas dan Pencapaian",
        note: null,
        question: "Tuliskan informasi tentang tempat Anda bekerja saat ini",
        tunnelId: 6,
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
        headline: null,
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Tuliskan 3 aktivitas dan/atau pencapaian terbaik  dalam konteks aktivitas saat ini yang telah Anda raih. Aktivitas dan pencapaian di sini diartikan dalam arti yang luas, bisa jadi berupa proyek yang ditangani, kajian kebijakan yang telah dilakukan ",
        tunnelId: 6,
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
        headline: null,
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Sebutkan dan Jelaskan aktivitas dan/atau pencapaian terbaik 2",
        tunnelId: 6,
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
        headline: null,
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Sebutkan dan Jelaskan aktivitas dan/atau pencapaian terbaik 3",
        tunnelId: 6,
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
        headline: "Essai",
        note: "(maksimal 400 kata)",
        question: "Tema : bagaimana FIM bisa membantu Anda untuk meningkatkan kualitas diri Anda secara personal sehingga mampu memberikan keuntungan untuk masyarakat (maksimal 400 kata)",
        tunnelId: 6,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({ "Essai": "textarea" }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        headline: "Video Profil",
        note: null,
        question: "Sertakan karya yang berisikan profil singkat diri Anda beserta alasan mengapa ingin bergabung dalam keluarga besar FIM. Karya dapat berupa video, tulisan blog, rekaman podcast, unggahan instagram atau lainnya sesuai dengan platform yang Anda gunakan. Bagi pendaftar jalur selain Influencer, tugas ini bersifat optional (sebagai nilai tambah). Silahkan tuliskan link nya di bawah ini. ",
        tunnelId: 6,
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
        tunnelId: 6,
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
        tunnelId: 6,
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
