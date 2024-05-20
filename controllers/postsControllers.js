const express = require('express');
const { Sequelize } = require("sequelize");
const Author = require('../models/authorModels')
const Posts = require('../models/postsModel')
const asyncHandler = require('../utils/AsyncHandler')



const newPost= asyncHandler(async(req,res) => {
    const { author_id, title , content , image_path} = req.body
  console.log(title)
    if( author_id==="" ){
        throw new ApiError(400,"Author Id is required!")
    }
    if( title==="" ){
        throw new ApiError(400,"title field is required!")
    }
    if( content==="" ){
        throw new ApiError(400,"content field is required!")
    }
    try{
      const post = await Posts.create({
        author_id,
        title,
        content,
        image_path
      });
    return res.json(post); }
  catch(error){
    console.log(error)
    return res.status(500).json({ error: error });
  }

})

module.exports = newPost