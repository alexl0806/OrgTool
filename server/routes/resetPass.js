import express from "express";

import { resetPass } from "../controllers/user.js";

const router = express.Router();

router.post("/reset-password", resetPass);

export default router;