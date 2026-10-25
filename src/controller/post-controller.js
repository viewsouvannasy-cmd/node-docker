import { Post } from "../models/postModel.js";

const getAllPost = async (req, res) => {
  try {
    const result = await Post.find();

    res.status(200).json({ ok: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "internel server error" });
  }
};

const getPostById = async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);

    res.status(200).json({ ok: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "internel server error" });
  }
};

const createPost = async (req, res) => {
  try {
    const result = await Post.create(req.body);

    res.status(200).json({ ok: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "internel server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ ok: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "internel server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ ok: true, msg: "delete successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "internel server error" });
  }
};

export { getAllPost, getPostById, createPost, updatePost, deletePost };
