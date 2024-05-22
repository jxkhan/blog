const Posts = require("../models/postsModel");
const asyncHandler = require("../utils/AsyncHandler");
const ApiError = require("../utils/ApiError");

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
  if (!posts) {
    throw new ApiError(500, "Error fetching posts");
    //res.status(500).json({ message: 'Error fetching posts' });
  }
});

const getSinglePost = asyncHandler(async (req, res) => {
  const post_id = req.params.id;
  const post = await Posts.findByPk(post_id);
  console.log("post", post_id);
  if (post) {
    res.json(post);
  } else {
    //throw new ApiError(404, "Post not found")
    console.error(`Post with ID ${post_id} not found`);
    return res.status(404).json({ message: "Error fetching post" });
  }
});

const updatePost = asyncHandler(async (req, res) => {
  const post_id = req.params.id;
  const postToUpdate = await Posts.findByPk(post_id);
  if (!postToUpdate) {
    //return res.status(404).json({ message: 'Post not found' });
    throw new ApiError(404, "Post not found");
  }
  const { title, content } = req.body;
  if (!title || !content) {
    //return res.status(400).json({ message: 'Title and content are required' });
    throw new ApiError(400, "Title and content are required");
  }
  postToUpdate.title = title;
  postToUpdate.content = content;
  await postToUpdate.save();
  res.json(postToUpdate);
});

const deletePost = asyncHandler(async (req, res) => {
  const post_id = req.params.id;
  const postToDelete = await Posts.findByPk(post_id);
  if (!postToDelete) {
    throw new ApiError(404, "Post not found");
  }
  await postToDelete.destroy();
  res.json({ message: "Post deleted successfully" });
});

module.exports = [newPost, getPosts, getSinglePost, updatePost, deletePost];
