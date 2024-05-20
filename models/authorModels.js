const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../index");


const Author = sequelize.define("Author", {
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
    console.log("Author Table and Model synced Successfully");
  })
  .catch((err) => {
    console.log("Error syncing Author Table and Model !!  ");
  });


module.exports = Author
