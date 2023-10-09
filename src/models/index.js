const Sequelize = require("sequelize");

const db = {};

const sequelize = new Sequelize("nodejs", "postgres", "2023", {
  dialect: "postgres",
  host: "localhost",
});
// sequelize.sync().then(
//     console.log("sync")
//    )
const users = require("../models/user-details")(sequelize, Sequelize);
const cricketers = require("../models/cricketers")(sequelize, Sequelize);

db.Users = users;
db.Cricketers = cricketers;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
