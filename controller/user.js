import User from "../models/user.js";
import { genSalt, hash, compare } from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import { jwtSecret } from "../config.js";

// Inscription d'un utilisateur
export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already registered.");

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    const token = sign(
      { _id: user._id, email: user.email },
      jwtSecret
    );
    res.header("x-auth-token", token).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
}

// Connexion d'un utilisateur
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    let filter = {};
    filter.email = email;
    const role = await User.find(filter, {role: true, _id:false});
    const token = sign(
      { _id: user._id, email: user.email },
      jwtSecret
    );
    /*res.header("x-auth-token", token).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token
      });*/
    //console.log(token);
    console.log(role);
    res.header("x-auth-token", token).send("Login successful");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

// Récupération d'un utilisateur
export async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id).select("name password role");
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    //res.status(500).send(error);
    res.status(500).send("Server error");
  }
}

export async function userEdit(req, res) {
    try {
        const { name, password } = req.body;
    
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).send("User not found.");
    
        if(name) user.name = name;
        if(password) {
            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);
            user.password = hashedPassword;
        }
        const token = sign(
            { _id: user._id, email: user.email },
            jwtSecret
          );
        await user.save();
    
        res.header("x-auth-token", token).send({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
      }
  }