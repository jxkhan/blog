const Posts = require("../models/postsModel");
const Users = require("../models/userModels");
const asyncHandler = require("../utils/AsyncHandler");
const ApiError = require("../utils/ApiError");
const Author = require("../models/authorModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Comments = require("../models/commentModel");

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
  }
});

const getSinglePost = asyncHandler(async (req, res) => {
  const post_id = req.params.id;
  const post = await Posts.findByPk(post_id);
  console.log("post", post_id);
  if (post) {
    res.json(post);
  } else {
    // console.error(`Post with ID ${post_id} not found`);
    //return res.status(404).json({ message: "Error fetching post" });
    throw new ApiError(404, "Post not found");
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

const newAuthor = asyncHandler(async (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    throw new ApiError(400, "Name and bio are required");
  }
  const author = await Author.create({ name, bio });
  res.json(author);
});

const getAuthors = asyncHandler(async (req, res) => {
  console.log("Fetching Authors...");
  const authors = await Author.findAll();
  console.log("Authors fetched:", Author);
  res.json(authors);
  if (!authors) {
    throw new ApiError(404, "Error fetching Authors");
  }
});

const userRegister = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate user data
    if (!username || !email || !password) {
      throw new ApiError(400, "Please provide all required fields");
    }

    // Check if user already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      throw new ApiError(400, "User Already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    // Return success message or created user's details
    res.json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate user data
  if (!email || !password) {
    throw new ApiError(400, "Please provide all required fields");
  }

  // Find user by email
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Compare hashed password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate authentication token
  const token = jwt.sign({ userId: user.id }, "your_secret_key", {
    expiresIn: "1h",
  });

  // Return success message or authentication token
  res.json({ message: "User logged in successfully", token });
  {
    //console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const addComment = asyncHandler(async (req, res) => {
  const { content, post_id, user_id } = req.body;

  // Validate the data
  if (!content || !post_id || !user_id) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  // Create a new comment
  try {
    const comment = await Comments.create({ content, post_id, user_id });
    res.json(comment);
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Server Error");
  }
});

module.exports = [
  newPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
  newAuthor,
  getAuthors,
  userRegister,
  userLogin,
  addComment,
];
