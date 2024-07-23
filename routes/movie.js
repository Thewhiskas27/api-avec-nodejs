import { Router } from "express";
const router = Router();
import { register, list, listFiltre, getMovie } from "../controller/movie.js";
//import auth from "../middleware/authMiddleware.js";

// Routes utilisateurs
router.post("/register", register);
router.get("/list", list);
router.post("/list", listFiltre);
router.get("/:id", getMovie);

export default router;