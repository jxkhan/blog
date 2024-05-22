const Router = require('express')
const router = Router();
const [newPost,getPosts] = require('../controllers/postsControllers')


router.route("/posts").post(newPost);
router.route("/posts").get(getPosts);

module.exports = router;
