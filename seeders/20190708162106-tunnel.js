'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tunnels', [
      {
        id: 1,
        name: 'Next Gen',
        description:'peserta FIM yang akan menjadi kader inti dalam berbagai aktivitas FIM, baik ditingkat pusat maupun regional. Jalur ini dikhususkan bagi alumni FIM 20 yang telah mengikuti pelatihan wilayah pada 2018 lalu untuk meningkatkan kapasitas dan memperluas jejaring dalam skala nasional. Peserta dari jalur ini mendapat peluang kuota sebesar 70%',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:2,
        name: 'Campus Leader',
        description:'calon peserta FIM yang merupakan pimpinan/aktivis atau calon pemimpin kampus yang memiliki misi untuk mendapat posisi strategis di organisasi kemahasiswaan. Peserta dari jalur ini diharapkan memperkuat jejaring stategis & kolaborasi pemimpin kampus untuk memberikan impact yang lebih nyata. FIM terbuka bagi setiap calon peserta dengan berbagai model organisasi asalkan sepakat untuk open mind dan menjaga koridor yang terstruktur dalam menghadapi perbedaan.',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        name: 'Local Leader',
        description: 'calon peserta FIM yang merupakan pegiat yang fokus membangun kapasitas atau pemberdayaan masyarakat lokal di lingkungan daerah tempat tinggalnya. Jalur ini diharapkan bisa memberikan exposure yang lebih baik bagi para pejuang kerja-kerja basis, sekaligus memperbesar skala dan impact pekerjaannya. Aktivis yang dimaksud tidak terbatas pada kegiatan sosial saja, melainkan juga kegiatan ekonomi, politik, budaya, dan lainnya yang memiliki akar kuat di masyarakat',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:4,
        name: 'Young Professional',
        description: 'calon peserta yang berasal dari profesional muda yang telah bekerja selama 1-5 tahun setelah lulus kuliah. Peserta dari jalur ini diharapkan bisa mengamplifikasi FIM kepada jejaring profesional secara lebih luas, agar mampu meningkatkan social impact dari berbagai program FIM. Bagi profesional muda yang berasal dari perusahaan yang masuk dalam 500 Fortune Indonesia akan menjadi prioritas.',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:5,
        name: 'Young Expert',
        description: 'merupakan calon peserta dari jalur ini menyasar pada anak muda yang bercita-cita untuk menjadi expert/specialist di bidang/keilmuan tertentu. Jalur ini diharapkan bisa mengakselerasi proses transfer knowledge dan network creation dalam mencetak expert Indonesia di masa depan Bagi calon peserta yang juga pebisnis, bisa mendaftar melalui jalur ini untuk saling memperkuat benefit yang didapatkan dari network FIM',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:6,
        name: 'Public Servant',
        description: 'bagi calon peserta merupakan anak muda yang mengambil karir sebagai aparatur sipil negara. Jalur ini diharapkan mampu mengkonsolidasikan berbagai ide dan inisiatif jejaring FIM mengenai reformasi birokrasi ataupun perbaikan layanan bagi masyarakat. FIM percaya bahwa mendorong perubahan birokrasi / pemerintahan oleh anak-anak muda merupakan kontribusi yang menjadi prioritas aksi nyata saat ini.',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:7,
        name: 'Military',
        description: 'jalur khusus yang diadakan untuk para calon pemimpin Indonesia di masa depan yang berasal dari militer (AD, AL, AU, dan polisi). Calon peserta merupakan top performer dari berbagai jalur di akademi militer dan kepolisian',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:8,
        name: 'Influencer',
        description: 'diperuntukan bagi calon peserta FIM yang mewakili spirit dan karakter generasi millennial sebagai digital influencer, tech savvy dengan jangkauan network yang luas. Peserta dari jalur ini memiliki misi untuk memperkuat digital movement dari berbagai kampanye program FIM. FIM percaya bahwa masa depan Indonesia dipengaruhi oleh banyaknya berbagai kampanye kebaikan berbasis online. Digital footprint FIM diharapkan bisa menjadi role model bagi gerakan anak muda lainnya.',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tunnels', null, {});
  }
};
