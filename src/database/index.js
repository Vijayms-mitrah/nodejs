const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: process.env.HOST,
  port: 5432,
  database: "nodejs",
  user: "postgres",
  password: "2023",
});

module.exports = client;
