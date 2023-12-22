import { Post } from "../models/postModel.js";

export const getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      success: true,
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (e) {
    res.status(400).json({
      success: false,
    });
  }
};

export const getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: {
        post,
      },
    });
  } catch (e) {
    res.status(400).json({
      success: false,
    });
  }
};

export const createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json({
      success: true,
      data: {
        post,
      },
    });
  } catch (e) {
    res.status(400).json({
      success: false,
    });
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: {
        post,
      },
    });
  } catch (e) {
    res.status(400).json({
      success: false,
    });
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
    });
  }
};
