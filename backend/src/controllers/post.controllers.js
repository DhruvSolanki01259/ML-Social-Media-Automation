import Post from "../models/post.model.js";
import User from "../models/user.model.js";

// ✅ CREATE POST
export const createPost = async (req, res) => {
  try {
    const {
      title,
      description,
      tags,
      socialMedia,
      isScheduled,
      scheduledAt,
      mediaUrls,
    } = req.body;
    const userId = req.user._id;

    if (!title || !description || !socialMedia?.length) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPost = await Post.create({
      user: userId,
      title,
      description,
      tags,
      socialMedia,
      isScheduled,
      scheduledAt: isScheduled ? scheduledAt : null,
      isPosted: !isScheduled,
      mediaUrls,
    });

    // Update user's post references
    await User.findByIdAndUpdate(userId, {
      $push: isScheduled
        ? { scheduledPosts: newPost._id }
        : { uploadedPosts: newPost._id },
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Server error creating post" });
  }
};

// ✅ GET ALL POSTS (for logged-in user)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Get Posts Error:", error);
    res.status(500).json({ message: "Server error fetching posts" });
  }
};

// ✅ GET SINGLE POST
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, user: req.user._id });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    console.error("Get Post Error:", error);
    res.status(500).json({ message: "Server error fetching post" });
  }
};

// ✅ UPDATE POST
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const post = await Post.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updatedData,
      { new: true }
    );

    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found or not authorized" });

    res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.error("Update Post Error:", error);
    res.status(500).json({ message: "Server error updating post" });
  }
};

// ✅ DELETE POST
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOneAndDelete({ _id: id, user: req.user._id });

    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found or not authorized" });

    // Remove reference from user
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        uploadedPosts: id,
        scheduledPosts: id,
      },
    });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({ message: "Server error deleting post" });
  }
};
