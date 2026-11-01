import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const post = await Post.create({
      name,
      description,
      age
    });

    return res.status(201).json({
      message: "Post created successfully",
      post
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    return res.status(200).json({
      posts
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
const updatePost = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "No data provided for update"
      });
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    return res.status(200).json({
      message: "Post updated successfully",
      post
    });
  } catch (error) {
    console.error(error);

    if (
      error.name === "ValidationError" ||
      error.name === "CastError"
    ) {
      return res.status(400).json({
        message: "Invalid post ID or update data"
      });
    }

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    return res.status(200).json({
      message: "Post successfully deleted"
    });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid post ID"
      });
    }

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

export { createPost, getPosts, updatePost, deletePost };