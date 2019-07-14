'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
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
        headline: null,
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Sebutkan 1 aktivitas dan/atau pencapaian terbaik  dalam konteks aktivitas saat ini yang telah Anda raih. Aktivitas dan pencapaian di sini diartikan dalam arti yang luas, bisa jadi berupa pengalaman mendirikan usaha, menjuarai kompetisi, partisipasi dalam suatu konferensi, penulisan ilmiah, dll.",
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
      },
      {
        headline: "Video Profil",
        note: null,
        question: "Sertakan karya yang berisikan profil singkat diri Anda beserta alasan mengapa ingin bergabung dalam keluarga besar FIM. Karya dapat berupa video, tulisan blog, rekaman podcast, unggahan instagram atau lainnya sesuai dengan platform yang Anda gunakan. Bagi pendaftar jalur selain Influencer, tugas ini bersifat optional (sebagai nilai tambah). Silahkan tuliskan link nya di bawah ini. ",
        tunnelId: 5,
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
        tunnelId: 4,
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
        tunnelId: 5,
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
