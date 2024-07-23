import { Router } from "express";
const router = Router();
import { register, login, getUser } from "../controller/user.js";
import auth from "../middleware/authMiddleware.js";

// Routes utilisateurs
router.post("/register", register);
router.post("/login", login);
router.get("/:id", auth, getUser);

export default router;