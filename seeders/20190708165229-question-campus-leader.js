'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [

      {
        headline: "Aktivitas dan Pencapaian",
        note:"*nomor telpon ketua/ penanggung jawab akan dihubungi untuk proses validasi",
        question: "Sebutkan dan jelaskan 5 aktivitas dan/atau pencapaian terbaik  dalam konteks kepemimpinan yang telah Anda raih. Aktivitas dan pencapaian di sini diartikan dalam arti yang luas, bisa jadi berupa pengalaman organisasi, pengalaman kepanitiaan, pengalaman mendirikan organisasi,menjuarai kompetisi, partisipasi dalam suatu konferensi, penulisan ilmiah, dll.",
        tunnelId: 2,
        createdBy: 1,
        batchFIM: "20",
        isMany: 1,
        header: JSON.stringify({
          "No": "number",
          "Nama Aktivitas/ Pencapaian": "text",
          "Waktu Mulai":"date",
          "Waktu Selesai":"date",
          "Durasi": "number",
          "Scope/Wilayah": "text",
          "Peran/ Prestasi": "text",
          "No. Telpon Ketua/ Penanggung Jawab":"text",
          "Alasan mengapa aktivitas / pencapaian ini merupaka yang terbaik bagi Anda ? (max. 350 kata)":"text"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        headline: "Essai",
        note:"(maksimal 400 kata)",
        question: "Tema : rencana strategis Anda di kampus dan bagaimana FIM dapat membantu mewujudkannya",
        tunnelId: 2,
        createdBy: 1,
        batchFIM: "20",
        isMany: 0,
        header: JSON.stringify({"Answer": "text"}),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        headline: "Video Profil",
        note:null,
        question: "Sertakan karya yang berisikan profil singkat diri Anda beserta alasan mengapa ingin bergabung dalam keluarga besar FIM. Karya dapat berupa video, tulisan blog, rekaman podcast, unggahan instagram atau lainnya sesuai dengan platform yang Anda gunakan. Bagi pendaftar jalur selain Influencer, tugas ini bersifat optional (sebagai nilai tambah). Silahkan tuliskan link nya di bawah ini. ",
        tunnelId: 2,
        createdBy: 1,
        batchFIM: "20",
        isMany: 0,
        header: JSON.stringify({"Link Video": "text"}),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        headline: "Surat Rekomendasi",
        note:"Format Terlampir",
        question: "Pada Jalur ini, rekomendasi ini dapat diberikan oleh siapapun, baik itu teman baik, dosen, tokoh masyarakat, pemuka adat, petinggi organisasi, petinggi partai politik, atau alumni FIM, siapa saja asalkan mengenal kamu dengan baik",
        tunnelId: 2,
        createdBy: 1,
        batchFIM: "20",
        isMany: 0,
        header: JSON.stringify({"Attachment": "file"}),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        headline: "Pernyataan Komitmen",
        note:null,
        question: "Format Terlampir",
        tunnelId: 2,
        createdBy: 1,
        batchFIM: "20",
        isMany: 0,
        header: JSON.stringify({
          "Attachment": "file"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        headline: null,
        note:null,
        question: "Jika pernah, mohon sebutkan berapa kali Anda telah  mendaftar FIM?",
        tunnelId: 2,
        createdBy: 1,
        batchFIM: "20",
        isMany: 1,
        header: JSON.stringify({
          "No": "text",
          "FIM Ke-": "text",
          "Tahun": "number",
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        headline: "Kelas Paralel",
        question: "Berikut ini adalah daftar kelas untuk sesi paralel saat pelatihan FIM. Mohon berikan peringkat  1 (paling berminat) – 8 (paling tidak berminat), pada daftar kelas berikut;",
        tunnelId: 2,
        createdBy: 1,
        batchFIM: "20",
        isMany: 0,
        header: JSON.stringify({
          "Literasi dan pendidikan": "number",
          "Budaya dan pariwisata": "number",
          "Digital dan teknologi": "number",
          "Agrokompleks": "number",
          "Kesehatan": "number",
          "Energi dan Lingkungan": "number",
          "Commmunity Development": "number",
          "Sociopreneur": "number",
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
