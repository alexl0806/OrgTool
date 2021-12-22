import express from "express";

import {
  signIn,
  signUp,
  updateUser,
  refreshToken,
} from "../controllers/user.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/refreshToken", refreshToken);
router.patch("/:id", auth, updateUser);

export default router;
