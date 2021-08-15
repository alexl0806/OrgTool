import express from "express";

import { signIn, signUp, updateUser } from "../controllers/user.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.patch("/:id", auth, updateUser);

export default router;
