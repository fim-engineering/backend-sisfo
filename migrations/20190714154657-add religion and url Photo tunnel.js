'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
   return Promise.all([
     queryInterface.addColumn('Identities', 'otherReligion', {type:Sequelize.STRING}),
     queryInterface.addColumn('Tunnels', 'urlPicture', {type:Sequelize.STRING}),     
     queryInterface.changeColumn('Answers', 'answer', {type:Sequelize.TEXT('long')})
   ]);
  },

  down: (queryInterface, Sequelize) => {
    
   return Promise.all([
    queryInterface.removeColumn('Identities', 'otherReligion'),
    queryInterface.removeColumn('Tunnels', 'urlPicture'),    
    queryInterface.changeColumn('Answers', 'answer', {type:Sequelize.TEXT})
  ]);
  }
};
