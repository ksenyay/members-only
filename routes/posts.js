const { Router } = require("express");
const router = Router();
const postsController = require("../controllers/postsController");

router.post("/create_post", postsController.post_create);
router.post("/like_post", postsController.post_likes);

module.exports = router;
