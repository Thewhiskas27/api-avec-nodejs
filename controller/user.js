import User from "../models/user.js";
import { genSalt, hash, compare } from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import { jwtSecret } from "../config.js";
import Movie from "../models/movie.js";

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
      { _id: user._id, email: user.email, role: user.role },
      jwtSecret
    );
    res.header("x-auth-token", token).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
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
      { _id: user._id, email: user.email, role: user.role },
      jwtSecret
    );
    /*res.header("x-auth-token", token).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token
      });*/
    console.log(token);
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
            { _id: user._id, email: user.email, role: user.role },
            jwtSecret
          );
        await user.save();
    
        res.header("x-auth-token", token).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
      }
  }

export async function favList(req, res){
  try {
    const user = await User.findById(req.user._id).select("favorites");
    if (!user) return res.status(404).send("User not found");
    console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

export async function favToggle(req, res){
  try {
    /* 
    Récup user dans req
    Grâce au user dans la req, récup user dans la bdd
    reg.params.movieId, récup movie ID
    movie id -> movie dans bdd
    toggle dans liste
    */ 
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send("User not found");
    const movie = await Movie.findById(req.params.movieId).select("_id");
    if (!movie) return res.status(404).send("Movie not found");
    //const faves = user.favorites.values();
    for (const val in user.favorites){
      if (user.favorites[val] === movie._id.toString()) {
        user.favorites = user.favorites.filter(e => e !== movie._id.toString());
        console.log(user);
        await user.save();
        return res.status(200).send("The movie was taken out of your favorites");
      }
    }
    user.favorites.push(movie._id.toString());
    //console.log(user);
    await user.save();
    return res.status(200).send("The movie was added to your favorites");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

export async function watchLaterList(req, res){
  try {
    const user = await User.findById(req.user._id).select("watchLater");
    if (!user) return res.status(404).send("User not found");
    console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

export async function watchLaterToggle(req, res){
  try {
    /* 
    Récup user dans req
    Grâce au user dans la req, récup user dans la bdd
    reg.params.movieId, récup movie ID
    movie id -> movie dans bdd
    toggle dans liste
    */ 
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send("User not found");
    const movie = await Movie.findById(req.params.movieId).select("_id");
    if (!movie) return res.status(404).send("Movie not found");
    //const faves = user.favorites.values();
    for (const val in user.watched){
      if (user.watched[val] === movie._id.toString()) {
        user.watched = user.watched.filter(e => e !== movie._id.toString());
        await user.save();
      }
    }
    for (const val in user.watching){
      if (user.watching[val] === movie._id.toString()) {
        user.watching = user.watching.filter(e => e !== movie._id.toString());
        await user.save();
      }
    }
    for (const val in user.watchLater){
      if (user.watchLater[val] === movie._id.toString()) {
        user.watchLater = user.watchLater.filter(e => e !== movie._id.toString());
        await user.save();
        return res.status(200).send("The movie was taken out of your watch later playlist");
      }
    }
    user.watchLater.push(movie._id.toString());
    //console.log(user);
    await user.save();
    return res.status(200).send("The movie was marked to your watch later playlist");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

export async function watchedList(req, res){
  try {
    const user = await User.findById(req.user._id).select("watched");
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

export async function watchedToggle(req, res){
  try {
    /* 
    Récup user dans req
    Grâce au user dans la req, récup user dans la bdd
    reg.params.movieId, récup movie ID
    movie id -> movie dans bdd
    toggle dans liste
    */ 
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send("User not found");
    const movie = await Movie.findById(req.params.movieId).select("_id");
    if (!movie) return res.status(404).send("Movie not found");
    //const faves = user.favorites.values();
    for (const val in user.watchLater){
      if (user.watchLater[val] === movie._id.toString()) {
        user.watchLater = user.watchLater.filter(e => e !== movie._id.toString());
        await user.save();
      }
    }
    for (const val in user.watching){
      if (user.watching[val] === movie._id.toString()) {
        user.watching = user.watching.filter(e => e !== movie._id.toString());
        await user.save();
      }
    }
    for (const val in user.watched){
      if (user.watched[val] === movie._id.toString()) {
        user.watched = user.watched.filter(e => e !== movie._id.toString());
        await user.save();
        return res.status(200).send("The movie was taken out of your watched playlist");
      }
    }
    user.watched.push(movie._id.toString());
    //console.log(user);
    await user.save();
    return res.status(200).send("The movie was marked to your watched playlist");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

export async function watchingList(req, res){
  try {
    const user = await User.findById(req.user._id).select("watching");
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

export async function watchingToggle(req, res){
  try {
    /* 
    Récup user dans req
    Grâce au user dans la req, récup user dans la bdd
    reg.params.movieId, récup movie ID
    movie id -> movie dans bdd
    toggle dans liste
    */ 
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send("User not found");
    const movie = await Movie.findById(req.params.movieId).select("_id");
    if (!movie) return res.status(404).send("Movie not found");
    //const faves = user.favorites.values();
    for (const val in user.watched){
      if (user.watched[val] === movie._id.toString()) {
        user.watched = user.watched.filter(e => e !== movie._id.toString());
        await user.save();
      }
    }
    for (const val in user.watchLater){
      if (user.watchLater[val] === movie._id.toString()) {
        user.watchLater = user.watchLater.filter(e => e !== movie._id.toString());
        await user.save();
      }
    }
    for (const val in user.watching){
      if (user.watching[val] === movie._id.toString()) {
        user.watching = user.watching.filter(e => e !== movie._id.toString());
        await user.save();
        return res.status(200).send("The movie was taken out of your watching playlist");
      }
    }
    user.watching.push(movie._id.toString());
    //console.log(user);
    await user.save();
    return res.status(200).send("The movie was marked to your watching playlist");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

export async function deleteAcc(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid name or password.");

    const validPassword = await compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid name or password.");

    await user.deleteOne();
    res.send("Account deleted successfully!");
    //res.header("x-auth-token", token).send("Deletion successful");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

export async function userList(req, res) {
  try {
    if(req.user.role.toString() === "admin"){
      const users = await User.find({}, {name: true, email: true, _id: false});
      if (!users) return res.status(404).send("User not found");
      res.send(users);
    }else{
      res.status(401).send("Not an admin")
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
}

export async function aGetUser(req, res) {
  try {
    if (req.user.role.toString() === "admin"){
      const user = await User.findById(req.params.id).select("name email password role createdAt favorites watchLater watched watching");
      if (!user) return res.status(404).send("User not found");
      res.send(user);
    }else{
      res.status(401).send("Not an admin")
    }
  } catch (error) {
    //res.status(500).send(error);
    res.status(500).send("Server error");
  }
}