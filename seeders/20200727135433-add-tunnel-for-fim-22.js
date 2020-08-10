'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tunnels', [
      {
        id: 9,
        name: 'Alumni FIM 20',
        description: 'Merupakan Jalur Kader NextGen FIM yang telah mengikuti Rangkaian Pelatihan FIM Wilayah angkatan 20.',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        urlPicture: 'https://res.cloudinary.com/fim-indonesia/image/upload/v1563328023/icon/NG_-_IKON_JALUR_MASUK_-_WEB_-_ILUSTRASI.png',
        batchFim: '22'
      },
      {
        id: 10,
        name: 'Volunteer FIM',
        description: 'Merupakan anggota relawan FIM Regional yang ditetapkan dalam SK Keanggotaan dari FIM Regional.',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        urlPicture: 'https://res.cloudinary.com/fim-indonesia/image/upload/v1563328023/icon/NG_-_IKON_JALUR_MASUK_-_WEB_-_ILUSTRASI.png',
        batchFim: '22'
      },
      {
        id: 11,
        name: 'Sahabat FIM',
        description: 'Merupakan pemuda, mahasiswa, dan profesional dengan berbagai latar belakang (Non Alumni FIM) dan pernah memiliki pengalaman mengikuti kegiatan FIM baik di FIM Pusat, FIM Regional, maupun kegiatan FIM Club (misal: pernah mengikuti Public Seminar, Webinar FIM, kerjasama komunitas, dll).',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        urlPicture: 'https://res.cloudinary.com/fim-indonesia/image/upload/v1563328023/icon/NG_-_IKON_JALUR_MASUK_-_WEB_-_ILUSTRASI.png',
        batchFim: '22'
      }

    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tunnels', { batchFim: '22' }, {})
  }
};
