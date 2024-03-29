'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AlumniReferences', { 
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
      fullName: {
        type: Sequelize.STRING
      },
      batch: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      relationship: {
        type: Sequelize.STRING
      },
      acquaintedSince: {
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
    }).then(() => queryInterface.addIndex('AlumniReferences', ['userId']));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AlumniReferences');
  }
};
