'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Summaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ktpNumber: {
        type: Sequelize.STRING
      },
      TunnelId: {
        type: Sequelize.INTEGER
      },
      batchFim: {
        type: Sequelize.STRING
      },
      isFinal: {
        type: Sequelize.INTEGER
      },
      recruiterId: {
        type: Sequelize.INTEGER
      },
      scoreFinal: {
        type: Sequelize.INTEGER
      },
      createdBy: {
        type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Summaries');
  }
};