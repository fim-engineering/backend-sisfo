'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SocialMedia', { 
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
      twitterUrl: {
        type: Sequelize.STRING
      },
      instagramUrl: {
        type: Sequelize.STRING
      },
      facebookUrl: {
        type: Sequelize.STRING
      },
      websiteUrl: {
        type: Sequelize.STRING
      },
      otherSiteUrl: {
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
    }).then(() => queryInterface.addIndex('SocialMedia', ['userId']));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SocialMedia');
  }
};
