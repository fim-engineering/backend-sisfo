'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FormCompleteness', { 
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
      isFirstStepCompleted: {
        type: Sequelize.BOOLEAN
      },
      isSecondStepCompleted: {
        type: Sequelize.BOOLEAN
      },
      isThirdStepCompleted: {
        type: Sequelize.BOOLEAN
      },
      isFourthStepCompleted: {
        type: Sequelize.BOOLEAN
      },
      submittedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('FormCompleteness', ['userId']));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FormCompleteness');
  }
};
