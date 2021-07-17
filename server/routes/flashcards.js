import express from "express";

import { getFlashcards, createFlashcard } from "../controllers/flashcards.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getFlashcards);
router.post("/", auth, createFlashcard);

export default router;
