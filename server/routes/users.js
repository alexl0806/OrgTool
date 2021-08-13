import express from "express";

import { signIn, signUp, updateUser } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.patch("/:id", updateUser);

export default router;
