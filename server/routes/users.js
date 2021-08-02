import express from "express";

import { signIn, signUp, getUsers } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", signUp);
router.post("/signin", signIn);

export default router;
