import express, { json } from "express";
import { connect } from "mongoose";
import userRoutes from "./routes/user.js";
import { dbUri } from "./config.js";

// Initialisation de l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(json());

// Connexion à MongoDB
connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Utilisation des routes utilisateurs
app.use("/api/users", userRoutes);

export default app;