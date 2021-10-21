const Sequelize = require('sequelize');
let sequelize = null;


console.log(process.env.DATABASE_NAME)

sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS,{
    host:process.env.HOST,
    dialect : process.env.DIALECT,
    operatorsAliases: false
});

module.exports = sequelize;
