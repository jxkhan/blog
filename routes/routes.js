const Router = require("express");
const router = Router();
const [
  newPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
] = require("../controllers/postsControllers");

router.route("/posts").post(newPost);

router.route("/posts").get(getPosts);

router.route("/posts/:id").get(getSinglePost);

router.route("/posts/:id").put(updatePost);

router.route("/posts/:id").delete(deletePost);

module.exports = router;
