'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Attendance', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      batch: {
        type: Sequelize.STRING
      },
      isAttend: {
        type: Sequelize.BOOLEAN
      },
      reason: {
        type: Sequelize.TEXT
      },
      reasonUrl: {
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
    }).then(() => queryInterface.addIndex('Attendance', ['userId']));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Attendance');
  }
};
