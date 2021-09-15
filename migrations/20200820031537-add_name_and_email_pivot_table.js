'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('ParticipantRecruiters', 'nameRecruiter', { type: Sequelize.STRING }),
      queryInterface.addColumn('ParticipantRecruiters', 'emailRecruiter', { type: Sequelize.STRING }),
    ])
    
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('ParticipantRecruiters', 'nameRecruiter'),
      queryInterface.removeColumn('ParticipantRecruiters', 'emailRecruiter'),
    ])
  }
};
