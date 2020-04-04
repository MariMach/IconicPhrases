const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const extractFille = require("../middleware/fille");
const postController = require("../controllers/post");

router.post("", auth, extractFille, postController.createPost);

router.put("/:id", auth, extractFille, postController.updatePost);

router.get("", postController.getPosts);

router.get("/:id", postController.getPost);

router.delete("/:id", auth, postController.deletePost);

module.exports = router;
