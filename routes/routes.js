const Router = require("express");
const router = Router();
const [
  newPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
  newAuthor,
  getAuthors,
  userRegister,
] = require("../controllers/postsControllers");
//Posts end points
router.route("/posts").post(newPost);

router.route("/posts").get(getPosts);

router.route("/posts/:id").get(getSinglePost);

router.route("/posts/:id").put(updatePost);

router.route("/posts/:id").delete(deletePost);

//author end points
router.route("/author").post(newAuthor);

router.route("/author").get(getAuthors);

router.route("/users").post(userRegister);

module.exports = router;
