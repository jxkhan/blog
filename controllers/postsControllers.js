const express = require("express");
const { Sequelize } = require("sequelize");
const Author = require("../models/authorModels");
const Posts = require("../models/postsModel");
const asyncHandler = require("../utils/AsyncHandler");
const ApiError = require("../utils/ApiError");
const sequelize = require("../index");

const newPost = asyncHandler(async (req, res) => {
  const { author_id, title, content, image_path } = req.body;
  console.log(title);
  if (author_id === "") {
    throw new ApiError(400, "Author Id is required!");
  }
  if (title === "") {
    throw new ApiError(400, "title field is required!");
  }
  if (content === "") {
    throw new ApiError(400, "content field is required!");
  }
  try {
    const post = await Posts.create({
      author_id,
      title,
      content,
      image_path,
    });
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});

const getPosts = asyncHandler(async (req, res) => {
  console.log("Fetching posts...");
  const posts = await Posts.findAll();
  console.log("Posts fetched:", posts);
  res.json(posts);
  if(!posts)
  {
    throw new ApiError(500, "Error fetching posts");
    //res.status(500).json({ message: 'Error fetching posts' });
  }
});

const getSinglePost = asyncHandler(async (req, res) => {
  
    const post_id = req.params.id;
    const post = await Posts.findByPk(post_id);
    console.log("post", post_id)
    if (post) {
      res.json(post);
    } else {
      //throw new ApiError(404, "Post not found")
      console.error(`Post with ID ${post_id} not found`);
      return res.status(404).json({ message: 'Error fetching post' });
    }
  
});

module.exports = [newPost, getPosts, getSinglePost];