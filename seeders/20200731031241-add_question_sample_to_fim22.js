'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        id: 36,
        headline: "Aktivitas dan Pencapaian",
        note: null,
        question: "Tuliskan aktvitas/pencapaian terbaik yang pernah kamu raih (baik dalam bidang pekerjaan formal, komunitas (FIM atau Non FIM) ataupun bidang akademik)",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 0,
        header: JSON.stringify({
          "Nama Aktivitas 1 / Pencapaian 1": "text",
          "Penyelenggara": "text",
          "Waktu Mulai": "date",
          "Durasi (Bulan)": "number",
          "Scope/ Cakupan Wilayah": "text",
          "Peran/ Prestasi": "text",
          "No. Telpon Ketua/ Penanggung Jawab": "text",
          "Tuliskan alasan mengapa aktivitas / pencapaian ini merupaka yang terbaik bagi Anda ? (max. 350 kata)": "textarea",
          "Apa yang kamu lakukan sehingga dapat mencapai prestasi tersebut": "textarea",
          "Tuliskan bagaimana aktivitas/pencapaian tersebut berdampak bagi diri sendiri": "textarea",
          "Tuliskan bagaimana aktivitas/pencapaian tersebut dapat berdampak bagi lingkungan di sekitar kamu": "textarea"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 37,
        headline: null,
        note: null,
        question: "Tuliskan aktvitas/pencapaian terbaik ke 2 yang pernah kamu raih (baik dalam bidang pekerjaan formal, komunitas (FIM atau Non FIM) ataupun bidang akademik)",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 0,
        header: JSON.stringify({
          "Nama Aktivitas 2 / Pencapaian 2": "text",
          "Penyelenggara": "text",
          "Waktu Mulai": "date",
          "Durasi (Bulan)": "number",
          "Scope/ Cakupan Wilayah": "text",
          "Peran/ Prestasi": "text",
          "No. Telpon Ketua/ Penanggung Jawab": "text",
          "Tuliskan alasan mengapa aktivitas / pencapaian ini merupaka yang terbaik bagi Anda ? (max. 350 kata)": "textarea",
          "Apa yang kamu lakukan sehingga dapat mencapai prestasi tersebut": "textarea",
          "Tuliskan bagaimana aktivitas/pencapaian tersebut berdampak bagi diri sendiri": "textarea",
          "Tuliskan bagaimana aktivitas/pencapaian tersebut dapat berdampak bagi lingkungan di sekitar kamu": "textarea"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 38,
        headline: null,
        note: null,
        question: "Tuliskan aktvitas/pencapaian terbaik ke 3 yang pernah kamu raih (baik dalam bidang pekerjaan formal, komunitas (FIM atau Non FIM) ataupun bidang akademik)",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 0,
        header: JSON.stringify({
          "Nama Aktivitas 3 / Pencapaian 3": "text",
          "Penyelenggara": "text",
          "Waktu Mulai": "date",
          "Durasi (Bulan)": "number",
          "Scope/ Cakupan Wilayah": "text",
          "Peran/ Prestasi": "text",
          "No. Telpon Ketua/ Penanggung Jawab": "text",
          "Tuliskan alasan mengapa aktivitas / pencapaian ini merupaka yang terbaik bagi Anda ? (max. 350 kata)": "textarea",
          "Apa yang kamu lakukan sehingga dapat mencapai prestasi tersebut": "textarea",
          "Tuliskan bagaimana aktivitas/pencapaian tersebut berdampak bagi diri sendiri": "textarea",
          "Tuliskan bagaimana aktivitas/pencapaian tersebut dapat berdampak bagi lingkungan di sekitar kamu": "textarea"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 39,
        headline: null,
        note: null,
        question: "Tuliskan aktvitas/pencapaian terbaik ke 4 yang pernah kamu raih (baik dalam bidang pekerjaan formal, komunitas (FIM atau Non FIM) ataupun bidang akademik)",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 0,
        header: JSON.stringify({
          "Nama Aktivitas 4 / Pencapaian 4": "text",
          "Penyelenggara": "text",
          "Waktu Mulai": "date",
          "Durasi (Bulan)": "number",
          "Scope/ Cakupan Wilayah": "text",
          "Peran/ Prestasi": "text",
          "No. Telpon Ketua/ Penanggung Jawab": "text",
          "Tuliskan alasan mengapa aktivitas / pencapaian ini merupaka yang terbaik bagi Anda ? (max. 350 kata)": "textarea",
          "Apa yang kamu lakukan sehingga dapat mencapai prestasi tersebut": "textarea",
          "Tuliskan bagaimana aktivitas/pencapaian tersebut berdampak bagi diri sendiri": "textarea",
          "Tuliskan bagaimana aktivitas/pencapaian tersebut dapat berdampak bagi lingkungan di sekitar kamu": "textarea"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 40,
        headline: null,
        note: null,
        question: "Tuliskan aktvitas/pencapaian terbaik ke 5 yang pernah kamu raih (baik dalam bidang pekerjaan formal, komunitas (FIM atau Non FIM) ataupun bidang akademik)",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 0,
        header: JSON.stringify({
          "Nama Aktivitas 5 / Pencapaian 5": "text",
          "Penyelenggara": "text",
          "Waktu Mulai": "date",
          "Durasi (Bulan)": "number",
          "Scope/ Cakupan Wilayah": "text",
          "Peran/ Prestasi": "text",
          "No. Telpon Ketua/ Penanggung Jawab": "text",
          "Tuliskan alasan mengapa aktivitas / pencapaian ini merupaka yang terbaik bagi Anda ? (max. 350 kata)": "textarea",
          "Apa yang kamu lakukan sehingga dapat mencapai prestasi tersebut": "textarea",
          "Tuliskan bagaimana aktivitas/pencapaian tersebut berdampak bagi diri sendiri": "textarea",
          "Tuliskan bagaimana aktivitas/pencapaian tersebut dapat berdampak bagi lingkungan di sekitar kamu": "textarea"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: 41,
        headline: "FIM Experience",
        note: 'Jelaskan FIM Experience yang pernah kamu rasakan (diurutkan dari pengalaman yang paling bermakna ya! minimal 1 pengalaman yg harus kamu masukkan disini)',
        question: "FIM experience apa saja yang pernah kamu ikuti ?",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 0,
        header: JSON.stringify({
          "Nama Kegiatan 1": { type: "text", placeholder: "Silahkan tulis nama kegiatan yang diikuti dan nama penyelenggaranya" },
          "Tugas / tanggung jawab": { type: "text", placeholder: "Silahkan tulis tugas yang diberikan kepadamu pada kegiatan ini " },
          "Peran": { type: "textarea", placeholder: "Ceritakan apa saja yang kamu lakukan untuk melaksanakan tugas serta dukungan dalam pelaksanaan kegiatan (ex: koordinator, bendahara, sie acara, peserta)" },
          "Durasi Kegiatan": { type: "text", placeholder: "Silahkan tulis berapa lama rentang waktu kegiatan dari persiapan sampai penutupan (ex: 2 minggu, 3 bulan)" },
          "Skala kegiatan": { type: "text", placeholder: "Silahkan tulis skala kegiatan yang dilaksanakan (FIM Pusat, FIM Regional, atau FIM Club)" },
          "Hasil kegiatan": { type: "textarea", placeholder: "Ceritakan bagaimana hasil dari peranmu dalam menyelesaikan tanggung jawab yang telah diberikan kepadamu" }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 42,
        headline: null,
        note: null,
        question: "FIM experience apa saja yang pernah kamu ikuti 2 ?",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 0,
        header: JSON.stringify({
          "Nama Kegiatan 2": { type: "text", placeholder: "Silahkan tulis nama kegiatan yang diikuti dan nama penyelenggaranya" },
          "Tugas / tanggung jawab": { type: "text", placeholder: "Silahkan tulis tugas yang diberikan kepadamu pada kegiatan ini " },
          "Peran": { type: "textarea", placeholder: "Ceritakan apa saja yang kamu lakukan untuk melaksanakan tugas serta dukungan dalam pelaksanaan kegiatan (ex: koordinator, bendahara, sie acara, peserta)" },
          "Durasi Kegiatan": { type: "text", placeholder: "Silahkan tulis berapa lama rentang waktu kegiatan dari persiapan sampai penutupan (ex: 2 minggu, 3 bulan)" },
          "Skala kegiatan": { type: "text", placeholder: "Silahkan tulis skala kegiatan yang dilaksanakan (FIM Pusat, FIM Regional, atau FIM Club)" },
          "Hasil kegiatan": { type: "textarea", placeholder: "Ceritakan bagaimana hasil dari peranmu dalam menyelesaikan tanggung jawab yang telah diberikan kepadamu" }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 43,
        headline: null,
        note: null,
        question: "FIM experience apa saja yang pernah kamu ikuti 3 ?",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 0,
        header: JSON.stringify({
          "Nama Kegiatan 3": { type: "text", placeholder: "Silahkan tulis nama kegiatan yang diikuti dan nama penyelenggaranya" },
          "Tugas / tanggung jawab": { type: "text", placeholder: "Silahkan tulis tugas yang diberikan kepadamu pada kegiatan ini " },
          "Peran": { type: "textarea", placeholder: "Ceritakan apa saja yang kamu lakukan untuk melaksanakan tugas serta dukungan dalam pelaksanaan kegiatan (ex: koordinator, bendahara, sie acara, peserta)" },
          "Durasi Kegiatan": { type: "text", placeholder: "Silahkan tulis berapa lama rentang waktu kegiatan dari persiapan sampai penutupan (ex: 2 minggu, 3 bulan)" },
          "Skala kegiatan": { type: "text", placeholder: "Silahkan tulis skala kegiatan yang dilaksanakan (FIM Pusat, FIM Regional, atau FIM Club)" },
          "Hasil kegiatan": { type: "textarea", placeholder: "Ceritakan bagaimana hasil dari peranmu dalam menyelesaikan tanggung jawab yang telah diberikan kepadamu" }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 44,
        headline: null,
        note: null,
        question: "FIM experience apa saja yang pernah kamu ikuti 4 ?",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 0,
        header: JSON.stringify({
          "Nama Kegiatan 4": { type: "text", placeholder: "Silahkan tulis nama kegiatan yang diikuti dan nama penyelenggaranya" },
          "Tugas / tanggung jawab": { type: "text", placeholder: "Silahkan tulis tugas yang diberikan kepadamu pada kegiatan ini " },
          "Peran": { type: "textarea", placeholder: "Ceritakan apa saja yang kamu lakukan untuk melaksanakan tugas serta dukungan dalam pelaksanaan kegiatan (ex: koordinator, bendahara, sie acara, peserta)" },
          "Durasi Kegiatan": { type: "text", placeholder: "Silahkan tulis berapa lama rentang waktu kegiatan dari persiapan sampai penutupan (ex: 2 minggu, 3 bulan)" },
          "Skala kegiatan": { type: "text", placeholder: "Silahkan tulis skala kegiatan yang dilaksanakan (FIM Pusat, FIM Regional, atau FIM Club)" },
          "Hasil kegiatan": { type: "textarea", placeholder: "Ceritakan bagaimana hasil dari peranmu dalam menyelesaikan tanggung jawab yang telah diberikan kepadamu" }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 45,
        headline: null,
        note: null,
        question: "FIM experience apa saja yang pernah kamu ikuti 5 ?",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 0,
        header: JSON.stringify({
          "Nama Kegiatan 5": { type: "text", placeholder: "Silahkan tulis nama kegiatan yang diikuti dan nama penyelenggaranya" },
          "Tugas / tanggung jawab": { type: "text", placeholder: "Silahkan tulis tugas yang diberikan kepadamu pada kegiatan ini " },
          "Peran": { type: "textarea", placeholder: "Ceritakan apa saja yang kamu lakukan untuk melaksanakan tugas serta dukungan dalam pelaksanaan kegiatan (ex: koordinator, bendahara, sie acara, peserta)" },
          "Durasi Kegiatan": { type: "text", placeholder: "Silahkan tulis berapa lama rentang waktu kegiatan dari persiapan sampai penutupan (ex: 2 minggu, 3 bulan)" },
          "Skala kegiatan": { type: "text", placeholder: "Silahkan tulis skala kegiatan yang dilaksanakan (FIM Pusat, FIM Regional, atau FIM Club)" },
          "Hasil kegiatan": { type: "textarea", placeholder: "Ceritakan bagaimana hasil dari peranmu dalam menyelesaikan tanggung jawab yang telah diberikan kepadamu" }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 46,
        headline: "Rencana di FIM",
        note: null,
        question: "Tuliskan alasan mendaftar FIM 22",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 0,
        header: JSON.stringify({
          "answer": { type: "textarea", placeholder: "Silahkan tulis alasan kamu mengapa bergabung FIM" },
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 47,
        headline: null,
        note: null,
        question: "Tuliskan rencana kamu setelah mengikuti Pelatihan FIM 22",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 1,
        header: JSON.stringify({
          "answer": {
            type: "select", placeholder: "Pilih pilihan berikut",
            options: [
              {
                value: "Mengembangkan regional yang sudah ada",
                label: "Mengembangkan regional yang sudah ada",
                conditionalnest: null
              },
              {
                value: "Membangun Regional Baru",
                label: "Membangun Regional Baru",
                conditionalnest: {
                  "regional": { type: "text", placeholder: "silahkan ketik nama kota/kabupaten regional baru yang ingin kamu bentuk" }
                }
              },
            ]
          },
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 48,
        headline: null,
        note: null,
        question: "Tuliskan keahlian/keterampilan diri yang dapat kamu berdayakan untuk berkontribusi di FIM (Regional & Pusat)",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 1,
        header: JSON.stringify({
          "answer": {
            type: "text", placeholder: null,            
          },
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 49,
        headline: "Rencana program yang akan dilakukan setelah menyelesaikan Pelatihan FIM 22",
        note: null,
        question: "",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 1,
        header: JSON.stringify({
          "Jelaskan kondisi terkini regional kamu saat ini (sesuai dengan domisili saat ini/ satu tahun kedepan)": {
            type: "textarea", placeholder: null,            
          },
          "Tuliskan rencana program yang akan dilaksanakan": {
            type: "textarea", placeholder: null,            
          },
          "Tuliskan pihak-pihak yang mungkin akan terlibat dalam program tersebut": {
            type: "textarea", placeholder: null,            
          },
          "Apa saja indikator keberhasilan dari program tersebut (misalnya: jumlah penerima manfaat 50 orang, kegiatan terpublikasi di 3 media nasional, dst)": {
            type: "textarea", placeholder: null,            
          },
          "Tulisan langkah-langkah bagaimana kamu mewujudkan program tersebut disertai dengan timeline": {
            type: "textarea", placeholder: null,            
          },
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 50,
        headline: null,
        note: null,
        question: "Rencana program yang akan dilakukan setelah menyelesaikan Pelatihan FIM 22",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 1,
        header: JSON.stringify({
          "Jelaskan kondisi terkini regional kamu saat ini (sesuai dengan domisili saat ini/ satu tahun kedepan)": {
            type: "textarea", placeholder: null,            
          },
          "Tuliskan rencana program yang akan dilaksanakan": {
            type: "textarea", placeholder: null,            
          },
          "Tuliskan pihak-pihak yang mungkin akan terlibat dalam program tersebut": {
            type: "textarea", placeholder: null,            
          },
          "Apa saja indikator keberhasilan dari program tersebut (misalnya: jumlah penerima manfaat 50 orang, kegiatan terpublikasi di 3 media nasional, dst)": {
            type: "textarea", placeholder: null,            
          },
          "Tulisan langkah-langkah bagaimana kamu mewujudkan program tersebut disertai dengan timeline": {
            type: "textarea", placeholder: null,            
          },
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 51,
        headline: "Upload Berkas Pendukung",
        note: null,
        question: "Upload surat komitmen",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 1,
        header: JSON.stringify({
          "Dokumen surat komitmen": {
            type: "upload", placeholder: null,            
          }          
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 52,
        headline: "Upload Berkas Pendukung",
        note: null,
        question: "Upload SK Keanggotaan FIM Regional untuk Volunteer FIM Regional dan Surat Rekomendasi dari Alumni FIM untuk Sahabat FIM",
        TunnelId: 9,
        createdBy: 1,
        batchFim: "22",
        isMany: 1,
        header: JSON.stringify({
          "Dokumen sk keanggotaan FIM Regional": {
            type: "upload", placeholder: null,            
          }          
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('Questions', {id: {$between: [36,52]}}, {});
  }
};
