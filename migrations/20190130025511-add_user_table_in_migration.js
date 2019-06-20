'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable('Users', {
          id : {
            type: Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        username:{
            type: Sequelize.STRING,
            allowNull:true
        },
        email: {
            type: Sequelize.STRING,
            allowNull:false
        },
        password: {
            type: Sequelize.STRING,
            allowNull:false
        },
        status : {
            type: Sequelize.STRING, 
            allowNull:true      
        },
        phone :{
            type : Sequelize.STRING,
            allowNull:true
        },
        userlevel : {
            type : Sequelize.INTEGER,
            allowNull:true
        },
        address :{
            type : Sequelize.TEXT,
            allowNull:true
        },
        gender :{
            type : Sequelize.STRING,
            allowNull:true
        },
        city :{
            type : Sequelize.STRING,
            allowNull:true
        },
        province :{
            type : Sequelize.STRING,
            allowNull:true
        },
        country : {
            type: Sequelize.STRING,
            allowNull: true
        },
        about_me : {
            type: Sequelize.TEXT,
            allowNull: true
        },
        lat : {
            type: Sequelize.TEXT,
            allowNull: true
        },
        long : {
            type: Sequelize.TEXT,
            allowNull: true
        },
        keu_user_id : {
            type: Sequelize.STRING,
            allowNull: true
        },
        flag_del : {
            type: Sequelize.STRING,
            allowNull: true
        },
        companyId : {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        deletedAt : {
            type:Sequelize.DATE,
            allowNull:true
        }
   })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.dropTable('Users')
  }
};
