'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrganizationExperiences', { 
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
      referencePerson: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      eventScale: {
        type: Sequelize.STRING
      },
      result: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('OrganizationExperiences', ['userId']));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrganizationExperiences');
  }
};
