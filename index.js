// const { Sequelize } = require("sequelize");

const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;
