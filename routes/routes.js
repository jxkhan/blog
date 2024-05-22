const Router = require('express')
const router = Router();
const [newPost,getPosts,getSinglePost,updatePost] = require('../controllers/postsControllers')


router.route("/posts").post(newPost);

router.route("/posts").get(getPosts);

router.route("/posts/:id").get(getSinglePost);


module.exports = router;
