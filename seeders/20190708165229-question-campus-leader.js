'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        id:5,
        headline: "Aktivitas dan Pencapaian",
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Sebutkan dan jelaskan 5 aktivitas dan/atau pencapaian terbaik dalam konteks kepemimpinan yang telah Anda raih. Aktivitas dan pencapaian di sini diartikan dalam arti yang luas, bisa jadi berupa pengalaman organisasi, pengalaman kepanitiaan, pengalaman mendirikan organisasi,menjuarai kompetisi, partisipasi dalam suatu konferensi, penulisan ilmiah, dll.",
        TunnelId: 2,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "Nama Aktivitas 1 / Pencapaian 1": "text",
          "Penyelenggara": "text",
          "Waktu Mulai": "date",
          "Waktu Selesai": "date",
          "Durasi": "number",
          "Scope/Wilayah": "text",
          "Peran/ Prestasi": "text",
          "No. Telpon Ketua/ Penanggung Jawab": "text",
          "Alasan mengapa aktivitas / pencapaian ini merupakan yang terbaik bagi Anda ? (max. 350 kata)": "text"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:6,
        headline: null,
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Sebutkan dan jelaskan aktivitas 2",
        TunnelId: 2,
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
          "Alasan mengapa aktivitas / pencapaian ini merupakan yang terbaik bagi Anda ? (max. 350 kata)": "text"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:7,
        headline: null,
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Sebutkan dan jelaskan aktivitas 3",
        TunnelId: 2,
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
          "Alasan mengapa aktivitas / pencapaian ini merupakan yang terbaik bagi Anda ? (max. 350 kata)": "text"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:8,
        headline: null,
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Sebutkan dan jelaskan aktivitas 4",
        TunnelId: 2,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "Nama Aktivitas 4/ Pencapaian 4": "text",
          "Penyelenggara": "text",
          "Waktu Mulai": "date",
          "Waktu Selesai": "date",
          "Durasi": "number",
          "Scope/Wilayah": "text",
          "Peran/ Prestasi": "text",
          "No. Telpon Ketua/ Penanggung Jawab": "text",
          "Alasan mengapa aktivitas / pencapaian ini merupakan yang terbaik bagi Anda ? (max. 350 kata)": "text"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:9,
        headline: null,
        note: "*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Sebutkan dan jelaskan aktivitas 5",
        TunnelId: 2,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({
          "Nama Aktivitas 5/ Pencapaian 5": "text",
          "Penyelenggara": "text",
          "Waktu Mulai": "date",
          "Waktu Selesai": "date",
          "Durasi": "number",
          "Scope/Wilayah": "text",
          "Peran/ Prestasi": "text",
          "No. Telpon Ketua/ Penanggung Jawab": "text",
          "Alasan mengapa aktivitas / pencapaian ini merupakan yang terbaik bagi Anda ? (max. 350 kata)": "text"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:10,
        headline: "Essai",
        note: "(maksimal 400 kata)",
        question: "Tema : rencana strategis Anda di kampus dan bagaimana FIM dapat membantu mewujudkannya",
        TunnelId: 2,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({ "Answer": "text" }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:11,
        headline: "Video Profil",
        note: null,
        question: "Sertakan karya yang berisikan profil singkat diri Anda beserta alasan mengapa ingin bergabung dalam keluarga besar FIM. Karya dapat berupa video, tulisan blog, rekaman podcast, unggahan instagram atau lainnya sesuai dengan platform yang Anda gunakan. Bagi pendaftar jalur selain Influencer, tugas ini bersifat optional (sebagai nilai tambah). Silahkan tuliskan link nya di bawah ini. ",
        TunnelId: 2,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({ "URL Link Video": "text" }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:12,
        headline: "Surat Rekomendasi",
        note: '<a href="https://res.cloudinary.com/fim-indonesia/raw/upload/v1563327650/document/Surat_Rekomendasi_FIM_21_non_next_gen.docx" >Format Terlampir</a>',
        question: "Pada Jalur ini, rekomendasi ini dapat diberikan oleh siapapun, baik itu teman baik, dosen, tokoh masyarakat, pemuka adat, petinggi organisasi, petinggi partai politik, atau alumni FIM, siapa saja asalkan mengenal kamu dengan baik",
        TunnelId: 2,
        createdBy: 1,
        batchFim: "20",
        isMany: 0,
        header: JSON.stringify({ "URL File": "text" }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    
      {
        id:13,
        headline: null,
        note: null,
        question: "Jika pernah, mohon sebutkan berapa kali Anda telah  mendaftar FIM ?",
        TunnelId: 2,
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
        id:14,
        headline: null,
        note: null,
        question: "Pendaftaran FIM ke 2 ?",
        TunnelId: 2,
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
        id:15,
        headline: null,
        note: null,
        question: "Pendaftaran FIM ke 3 ?",
        TunnelId: 2,
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
