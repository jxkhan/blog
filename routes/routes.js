const Router = require('express')
const router = Router();
const newPost = require('../controllers/postsControllers')


router.route("/posts").post(newPost);

module.exports = router;
