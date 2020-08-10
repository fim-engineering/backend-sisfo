'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Fimbatches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      date_start_registration: {
        type: Sequelize.DATE
      },
      date_end_registration: {
        type: Sequelize.DATE
      },
      date_event_start: {
        type: Sequelize.DATE
      },
      date_event_end: {
        type: Sequelize.DATE
      },
      leader: {
        type: Sequelize.INTEGER
      },
      tagline: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Fimbatches');
  }
};