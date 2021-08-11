import express from "express";

import { signIn, signUp, getUser, updateUser } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/:id", getUser);
router.patch("/:id", updateUser);

export default router;
