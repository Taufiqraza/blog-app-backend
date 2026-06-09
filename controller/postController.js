const Post = require('../models/Post');
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and Content is required" });
    }
    const image = req.file ? req.file.path : "";
    const post = await Post.create({
      title,
      content,
      image,
      author: req.user._id
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
      res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email');
    if (!post) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorised to delete this post" });
    }
    await post.deleteOne();
    res.json({ message: "Post Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createPost, getAllPosts, getPostById, deletePost }