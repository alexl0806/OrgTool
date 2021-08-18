import express from "express";

import {
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", auth, getTodo);
router.post("/", auth, createTodo);
router.patch("/:id", auth, updateTodo);
router.delete("/:id", auth, deleteTodo);

export default router;
