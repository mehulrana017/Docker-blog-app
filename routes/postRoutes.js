import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getOnePost,
  updatePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getAllPost).post(protect, createPost);
router
  .route("/:id")
  .get(protect, getOnePost)
  .patch(protect, updatePost)
  .delete(protect, deletePost);

export default router;
