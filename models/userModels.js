const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING, //   allowNull: false,
      //   validate: {
      //     notEmpty: true,
      //   },
      //   set(value) {
      //     const salt = bcrypt.genSaltSync(10);
      //     const hash = bcrypt.hashSync(value, salt);
      //     this.setDataValue("password", hash);
      //   },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    timestamps: false,
  }
);

Users.sync()
  .then((data) => {
    console.log("User Table and Model synced Successfully", data);
  })
  .catch((err) => {
    console.log("Error syncing User Table and Model !!", err);
  });

module.exports = Users;
