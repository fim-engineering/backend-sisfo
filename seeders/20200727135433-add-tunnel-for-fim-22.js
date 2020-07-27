'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tunnels', [
      {
        id: 9,
        name: 'Alumni FIM 20',
        description: 'jika kamu merupakan alumni FIM 20 pilih jalur ini',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        urlPicture: 'https://res.cloudinary.com/fim-indonesia/image/upload/v1563328023/icon/NG_-_IKON_JALUR_MASUK_-_WEB_-_ILUSTRASI.png',
        batchFim: '22'
      },
      {
        id: 10,
        name: 'Volunteer FIM',
        description: 'Jika kamu pernah pernah terlibat sebagai volunteer di salah satu agenda FIM pilih jalur ini',
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        urlPicture: 'https://res.cloudinary.com/fim-indonesia/image/upload/v1563328023/icon/NG_-_IKON_JALUR_MASUK_-_WEB_-_ILUSTRASI.png',
        batchFim: '22'
      },
      {
        id: 11,
        name: 'Sahabat FIM',
        description: 'Tahu tentang fim dan hanya sebatas kenal beberapa orang yang merupakan anggota FIM, pilih jalur ini ',
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
