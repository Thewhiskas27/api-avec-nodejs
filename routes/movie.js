import { Router } from "express";
const router = Router();
import { register, list, listFiltre, getMovie, movieEdit, movieDel } from "../controller/movie.js";
import auth from "../middleware/authMiddleware.js";

// Routes utilisateurs
router.get("/list", list); // Liste de films
router.post("/list", listFiltre); // Liste de films filtrés
router.get("/:id", getMovie); // Infos sur un film
// Routes administrateurs
router.post("/register", auth, register); // Ajout d'un film
router.post("/edit/:id", auth, movieEdit); // Modification des infos d'un film
router.delete("/del/:id", auth, movieDel); // Suppression d'un compte

export default router;