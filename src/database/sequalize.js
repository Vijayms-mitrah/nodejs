// // Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
//   });

const Sequelize = require("sequelize");

const sequelize = new Sequelize("restapi", "postgres", "2023", {
  dialect: "postgres",
  host: "localhost",
});

module.exports = sequelize;
