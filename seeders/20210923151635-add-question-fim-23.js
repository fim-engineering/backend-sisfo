'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        id: 54,
        headline: "Essay 1",
        note: null,
        question: "<small>Jawablah pertanyaan di bawah ini sesuai dengan pendapat kamu sendiri.<small>",
        TunnelId: 12,
        category: "essay",
        createdBy: 1,
        batchFim: "23",
        isMany: 0,
        header: JSON.stringify({
          "Jelaskan pengalaman Saudara ketika melakukan kesalahan yang murni disebabkan oleh diri anda sendiri yang dapat merugikan diri anda atau orang lain? dan Bagaimana Anda menyikapi hal tersebut?": { type: "textarea", placeholder: "tulis jawaban kamu di sini" },
          "Coba jelaskan situasi dimana kamu terpaksa berurusan dengan praktik konflik kepentingan yang membuat kamu harus mengambil keputusan secara cepat dan tepat?": { type: "textarea", placeholder: "tulis jawaban kamu di sini" },
          "Bagaimana sikap yang kamu ambil terhadap situasi di poin 2 dan jelaskan dampak dari sikap tersebut.": { type: "textarea", placeholder: "tulis jawaban kamu di sini" },
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 55,
        headline: "Essay 2",
        note: null,
        question: "<small>Jawablah pertanyaan di bawah ini sesuai dengan pendapat kamu sendiri.<small>",
        TunnelId: 12,
        category: "essay",
        createdBy: 1,
        batchFim: "23",
        isMany: 0,
        header: JSON.stringify({
          "Coba jelaskan nilai-nilai yang anda pegang teguh saat ini dan bagaimana anda mendapatkan nilai itu. Adakah figur yang nilai-nilainya kamu terapkan dalam hidup, jika iya, coba jelaskan siapa bagaimana dan mengapa. Berikan implementasi yang sudah kamu lakukan.": { type: "textarea", placeholder: "tulis jawaban kamu di sini" },
          "Bagaimana pendapatmu tentang ungkapan \"Setialah pada nilai, bukan Figur\" ? dan Berikan penerapannya dalam kehidupan sehari hari?": { type: "textarea", placeholder: "tulis jawaban kamu di sini" },
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 56,
        headline: "Essay 3",
        note: null,
        question: "<small>Jawablah pertanyaan di bawah ini sesuai dengan pendapat kamu sendiri.<small>",
        TunnelId: 12,
        category: "essay",
        createdBy: 1,
        batchFim: "23",
        isMany: 0,
        header: JSON.stringify({
          "Coba jelaskan aktivitas atau kegiatan apapun yang memberikan dampak kepada orang lain dan kenapa anda melakukan itu?": { type: "textarea", placeholder: "tulis jawaban kamu di sini" },
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 57,
        headline: "Essay 4",
        note: null,
        question: "<small>Jawablah pertanyaan di bawah ini sesuai dengan pendapat kamu sendiri.<small>",
        TunnelId: 12,
        category: "essay",
        createdBy: 1,
        batchFim: "23",
        isMany: 0,
        header: JSON.stringify({
          "Jelaskan arah tujuan hidupmu dan Ketika meninggal ingin diingat sebagai apa?": { type: "textarea", placeholder: "tulis jawaban kamu di sini" },
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 58,
        headline: "Essay 5",
        note: null,
        question: "<small>Jawablah pertanyaan di bawah ini sesuai dengan pendapat kamu sendiri.<small>",
        TunnelId: 12,
        category: "essay",
        createdBy: 1,
        batchFim: "23",
        isMany: 0,
        header: JSON.stringify({
          "Tuliskan bentuk kontribusi yang telah kamu lakukan untuk daerah / domisilimu saat ini dan mengapa kamu melakukan hal tersebut? (tuliskan peran, tanggung jawab, dan skala lingkupnya serta dapat sebelum dan selama pandemi, dan sertakan bukti jika ada yang dapat berupa link berita / foto / dll)": { type: "textarea", placeholder: "tulis jawaban kamu di sini" },
          "Bukti Dokumentasi": { type: "text", placeholder: "Tambahkan link dokumentasi kontribusi (jika ada)" }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 59,
        headline: "Rencana Pengabdian",
        note: null,
        question: "<small>Jawablah pertanyaan di bawah ini sesuai dengan pendapat kamu sendiri.<small>",
        TunnelId: 12,
        category: "volunteering_plan",
        createdBy: 1,
        batchFim: "23",
        isMany: 0,
        header: JSON.stringify({
          "1. Tuliskan alasan mendaftar FIM 23": { type: "textarea", placeholder: "tulis jawaban kamu di sini" },
          "2. Tuliskan & jelaskan satu keahlian/keterampilan diri yang telah diimplementasikan dan dapat kamu berdayakan untuk berkontribusi di FIM (Regional & Pusat)": { type: "textarea", placeholder: "tulis jawaban kamu di sini" },
          "3. Jelaskan kondisi Daerah / Regional kamu saat ini dan rencana program yang akan dilakukan setelah menyelesaikan Pelatihan FIM 23 untuk pengembangan daerah domisili kamu saat ini / regional (jawaban memuat informasi mengenai: kondisi daerah terkini, rencana program, pihak-pihak, indikator keberhasilan, dan langkah langkah serta timeline)": { type: "textarea", placeholder: "tulis jawaban kamu di sini" },
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Questions', {id: {$between: [54,59]}}, {});
  }
};
