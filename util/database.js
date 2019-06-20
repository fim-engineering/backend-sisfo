const Sequelize = require('sequelize');
let sequelize = null;

// console.log(process.env.JAWSDB_URL)

if(process.env.JAWSDB_URL) {
    // the application is executed on Heroku
    sequelize = new Sequelize(process.env.JAWSDB_URL, {
        host:'tyduzbv3ggpf15sx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        port:'3306',
        dialect : 'mysql',
        operatorsAliases: false
    })
} else {
    sequelize = new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USER,process.env.DATABASE_PASS,{
        host:process.env.HOST,
        dialect : process.env.DIALECT,
        operatorsAliases: false
    });
}


module.exports = sequelize;
