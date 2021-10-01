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
      fimBatch: {
        type: Sequelize.STRING
      },
      isFirstStepCompleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isSecondStepCompleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isThirdStepCompleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isFourthStepCompleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      submittedAt: {
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
