const { Sequelize, DataTypes } = require("sequelize");
const  Author  = require("./authorModels");
const sequelize = require("../index");

const Posts = sequelize.define(
  "Posts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
    },
    author_id: {
      type: DataTypes.INTEGER,
    //   unique: true,
      allowNull: false,

      references: {
          model: Author,
          key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_path: {
      type: DataTypes.STRING,
      references: "image_path"
    },
  },

  {
    timestamps: false,
  },

);

Author.hasMany(Posts),
Posts.belongsTo(Author)

Posts.sync()
  .then((data) => {
    console.log("Table and Model synced Successfully");
  })
  .catch((err) => {
    console.log("Error syncing Table and Model !!  ");
  });

 
module.exports = Posts