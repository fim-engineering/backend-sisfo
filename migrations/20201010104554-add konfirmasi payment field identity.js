'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Identities', 'attendenceConfirmationDate', { type: Sequelize.DATE }),
      queryInterface.addColumn('Identities', 'mbti', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'paymentDate', { type: Sequelize.DATE }),
      queryInterface.addColumn('Identities', 'bankTransfer', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'urlTransferPhoto', { type: Sequelize.STRING }),

    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Identities', 'attendenceConfirmationDate'),      
      queryInterface.removeColumn('Identities', 'mbti'),
      queryInterface.removeColumn('Identities', 'paymentDate'),
      queryInterface.removeColumn('Identities', 'bankTransfer'),
      queryInterface.removeColumn('Identities', 'urlTransferPhoto')      
    ])
  }
};
   