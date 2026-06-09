const express = require("express");
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { createPost, getAllPosts, getPostById, deletePost } = require('../controller/postController');

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", protect, upload.single('image'), createPost);
router.delete("/:id", protect, deletePost);

module.exports = router;