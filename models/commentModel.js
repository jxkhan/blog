const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../index");
const Posts = require("../models/postsModel");
const Users = require("./userModels");

const Comments = sequelize.define(
  "Comments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_At: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: false,
  }
);

Posts.hasMany(Comments, { foreignKey: "post_id" });
Comments.belongsTo(Posts, { foreignKey: "post_id" });

Users.hasMany(Comments, { foreignKey: "user_id" });
Comments.belongsTo(Users, { foreignKey: "user_id" });

Comments.sync()
  .then((data) => {
    console.log("Comments Table and Model synced Successfully", data);
  })
  .catch((err) => {
    console.log("Error syncing Comment Table and Model !!", err);
  });

module.exports = Comments;
