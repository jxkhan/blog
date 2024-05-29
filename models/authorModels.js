const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const Author = sequelize.define("author", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  bio: {
    type: DataTypes.STRING,
  },
});

Author.sync()
  .then((data) => {
    console.log("Author Table and Model synced Successfully", data);
  })
  .catch((err) => {
    console.log("Error syncing Author Table and Model !!", err);
  });

module.exports = Author;
