import Blog from "../models/Blog.js";

// ======================
// GET ALL BLOGS
// ======================
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("author", "username");

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blogs",
    });
  }
};

// ======================
// GET BLOG BY ID
// ======================
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id).populate("author", "username");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blog",
    });
  }
};

// ======================
// CREATE BLOG (PROTECTED)
// ======================
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      author: req.user.userId,
    });

    res.status(201).json({
      message: "Blog created",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create blog",
    });
  }
};

// ======================
// UPDATE BLOG (PROTECTED)
// ======================
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Ownership check
    if (blog.author.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not allowed to edit this blog",
      });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();

    res.status(200).json({
      message: "Blog updated",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update blog",
    });
  }
};

// ======================
// DELETE BLOG (PROTECTED)
// ======================
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Ownership check
    if (blog.author.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not allowed to delete this blog",
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete blog",
    });
  }
};
