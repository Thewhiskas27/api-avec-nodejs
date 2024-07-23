import { Router } from "express";
const router = Router();
import { register, login, getUser, userEdit } from "../controller/user.js";
import auth from "../middleware/authMiddleware.js";

// Routes utilisateurs
router.post("/register", register);
router.post("/login", login);
router.patch("/login/:id", userEdit);
router.get("/:id", auth, getUser);

export default router;