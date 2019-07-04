'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return Promise.all([
      queryInterface.addColumn('Identities', 'headline', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'photoUrl', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'religion', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'bornPlace', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'bornDate', { type: Sequelize.DATE }),
      queryInterface.addColumn('Identities', 'cityAddress', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'provinceAddress', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'emergencyPhone', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'gender', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'bloodGroup', { type: Sequelize.STRING }),
      queryInterface.addColumn('Identities', 'hoby', { type: Sequelize.TEXT }),
      queryInterface.addColumn('Identities', 'expertise', { type: Sequelize.STRING })            
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return Promise.all([
    queryInterface.removeColumn('Identities', 'headline'),
    queryInterface.removeColumn('Identities', 'photoUrl'),
    queryInterface.removeColumn('Identities', 'religion'),
    queryInterface.removeColumn('Identities', 'bornPlace'),
    queryInterface.removeColumn('Identities', 'bornDate'),
    queryInterface.removeColumn('Identities', 'cityAddress'),
    queryInterface.removeColumn('Identities', 'provinceAddress'),
    queryInterface.removeColumn('Identities', 'emergencyPhone'),
    queryInterface.removeColumn('Identities', 'gender'),
    queryInterface.removeColumn('Identities', 'bloodGroup'),
    queryInterface.removeColumn('Identities', 'hoby'),
    queryInterface.removeColumn('Identities', 'expertise')           
   ]);
  }
};
