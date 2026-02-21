import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// ======================
// PUBLIC ROUTES
// ======================
// GET all blogs
router.get("/", getAllBlogs);

// GET single blog
router.get("/:id", getBlogById);

// ======================
// PROTECTED ROUTES
// ======================

// CREATE blog
router.post("/", authMiddleware, createBlog);

// UPDATE blog
router.put("/:id", authMiddleware, updateBlog);

// DELETE blog
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
