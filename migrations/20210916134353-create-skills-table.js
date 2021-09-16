'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('Skills', { 
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
       isAbleVideoEditing: {
         type: Sequelize.BOOLEAN,
         defaultValue: 0
       },
       videoEditingPortofolioUrl: {
         type: Sequelize.STRING
       },
       firstCertificateUrl: {
         type: Sequelize.STRING
       },
       secondCertificateUrl: {
         type: Sequelize.STRING
       },
       thirdCertificateUrl: {
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
     await queryInterface.dropTable('Skills');
  }
};
