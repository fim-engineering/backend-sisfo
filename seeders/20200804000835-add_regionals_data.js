'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Regionals', [
      { id: 1, province: "Aceh", city: "Aceh", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, province: "Aceh", city: "Lhokseumawe", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, province: "Bali", city: "Denpasar", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, province: "Banten", city: "Banten", name: "Banten", createdAt: new Date(), updatedAt: new Date() },
      { id: 5, province: "Banten", city: "Tangerang", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 6, province: "Bengkulu", city: "Bengkulu", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 7, province: "DI Yogyakarta", city: "Jogjakarta", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 8, province: "DKI Jakarta", city: "Jakarta", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 9, province: "Gorontalo", city: "Gorontalo", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 10, province: "Jambi", city: "Jambi", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 11, province: "Jawa Barat", city: "Bandung", name: "Kece", createdAt: new Date(), updatedAt: new Date() },
      { id: 12, province: "Jawa Barat", city: "Bekasi", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 13, province: "Jawa Barat", city: "Bogor", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 14, province: "Jawa Barat", city: "Depok", name: "Dejapu", createdAt: new Date(), updatedAt: new Date() },
      { id: 15, province: "Jawa Barat", city: "Cirebon", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 16, province: "Jawa Tengah", city: "Purwokerto", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 17, province: "Jawa Tengah", city: "Semarang", name: "Oye", createdAt: new Date(), updatedAt: new Date() },
      { id: 18, province: "Jawa Tengah", city: "Solo", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 19, province: "Jawa Timur", city: "Madura", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 20, province: "Jawa Timur", city: "Malang", name: "Malang", createdAt: new Date(), updatedAt: new Date() },
      { id: 21, province: "Jawa Timur", city: "Sidoarjo", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 22, province: "Jawa Timur", city: "Surabaya", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 23, province: "Jawa Timur", city: "Jember", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 24, province: "Kalimantan Barat", city: "Pontianak", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 25, province: "Kalimantan Selatan", city: "Banjarbaru", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 26, province: "Kalimantan Selatan", city: "Banjarmasin", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 27, province: "Kalimantan Tengah", city: "Palangkaraya", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 28, province: "Kalimantan Timur", city: "Balikpapan", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 29, province: "Kalimantan Timur", city: "Samarinda", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 30, province: "Kalimantan Utara", city: "Tarakan", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 31, province: "Kepulauan Bangka Belitung", city: "Pangkal Pinang", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 32, province: "Kepulauan Riau", city: "Batam", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 33, province: "Lampung", city: "Bandar Lampung", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 34, province: "Maluku", city: "Ambon", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 35, province: "NTB", city: "Mataram", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 36, province: "NTB", city: "Sumbawa", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 37, province: "NTT", city: "Atambua", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 38, province: "NTT", city: "NTT", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 39, province: "Papua", city: "Jayapura", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 40, province: "Riau", city: "Pekanbaru", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 41, province: "Sulawesi Barat", city: "Majene", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 42, province: "Sulawesi Selatan", city: "Makassar", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 43, province: "Sulawesi Tengah", city: "Palu", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 44, province: "Sulawesi Tenggara", city: "Kendari", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 45, province: "Sulawesi Utara", city: "Manado", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 46, province: "Sumatera Barat", city: "Bukittinggi", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 47, province: "Sumatera Barat", city: "Padang", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 48, province: "Sumatera Selatan", city: "Palembang", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 49, province: "Sumatera Utara", city: "Sumatera Utara", name: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 50, province: "Internasional", city: "Diaspora", name: null, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
