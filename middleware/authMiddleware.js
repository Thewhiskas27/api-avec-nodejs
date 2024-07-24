import pkg from "jsonwebtoken";
const { verify } = pkg;
import { jwtSecret } from "../config.js";

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid token.");
  }
}


export default auth;