import { Router } from "express";
const router = Router();
import { register, login, getUser, userEdit, favList, favToggle, watchLaterList, 
    watchLaterToggle, watchedList, watchedToggle, watchingList, watchingToggle, deleteAcc, userList, aGetUser, fyp } from "../controller/user.js";
import auth from "../middleware/authMiddleware.js";

// Routes administrateur
router.get("/regusers", auth, userList); // Affiche liste d'utilisateurs
router.get("/regusers/:id", auth, aGetUser); // Infos sur le compte
// Routes utilisateurs
router.get("/foryou", auth, fyp);
router.post("/register", register); // Création de compte
router.post("/login", login); // Connexion
router.patch("/login/:id", auth, userEdit); // Modification des infos du compte
router.get("/:id", auth, getUser); // Infos sur le compte
router.get("/fav/list", auth, favList); // Liste de preferés
router.patch("/fav/:movieId", auth, favToggle); // Ajout / Suppression d'un film à la liste de preferés
router.get("/watchlater/list", auth, watchLaterList); // Liste de fims regardés
router.patch("/watchlater/:movieId", auth, watchLaterToggle); // Ajout / Suppression / Déplacement d'un film à la liste de films à regarder plus tard
router.get("/watched/list", auth, watchedList); // Liste de films à regarder
router.patch("/watched/:movieId", auth, watchedToggle); // Ajout / Suppression / Déplacement d'un film à la liste de films regardés
router.get("/watching/list", auth, watchingList); // Liste de films en train d'être regardés
router.patch("/watching/:movieId", auth, watchingToggle); // Ajout / Suppression / Déplacement d'un film à la liste de films en train de regarder
router.delete("/accdel/:id", auth, deleteAcc); // Suppression d'un compte



export default router;