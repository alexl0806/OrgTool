import express from "express";

import {
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTodo);
router.post("/", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
