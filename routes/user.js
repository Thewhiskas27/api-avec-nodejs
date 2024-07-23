import { Router } from "express";
const router = Router();
import { register, login, getUser, userEdit, favList, favToggle, watchLaterList, watchLaterToggle, watchedList, watchedToggle, watchingList, watchingToggle, deleteAcc } from "../controller/user.js";
import auth from "../middleware/authMiddleware.js";

// Routes utilisateurs
router.post("/register", register);
router.post("/login", login);
router.patch("/login/:id", userEdit);
router.get("/:id", auth, getUser);
router.get("/fav/list", auth, favList);
router.patch("/fav/:movieId", auth, favToggle);
router.get("/watchlater/list", auth, watchLaterList);
router.patch("/watchlater/:movieId", auth, watchLaterToggle);
router.get("/watched/list", auth, watchedList);
router.patch("/watched/:movieId", auth, watchedToggle);
router.get("/watching/list", auth, watchingList);
router.patch("/watching/:movieId", auth, watchingToggle);
router.delete("/accsuppr/:id", auth, deleteAcc)


export default router;