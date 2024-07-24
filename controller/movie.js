import Movie from "../models/movie.js";
//import { genSalt, hash, compare } from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import { jwtSecret } from "../config.js";

// Inscription d'un film
export async function register(req, res) {
  try {
    if (req.user.role.toString() === "admin"){
      const { name, director, genre, description, releaseDate, ageRating } = req.body;

      let movie = await Movie.findOne({ name, director });
      if (movie) return res.status(400).send("Movie already registered.");
  
      movie = new Movie({ name, director, genre, description, releaseDate, ageRating });
      await movie.save();
  
      res.status(201).send(movie);
    }else{
      res.status(401).send("You must be admin to do this!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

// Récupération de liste des films  GET
export async function list(req, res) {
  try {
    const movies = await Movie.find({}, {name: true, ageRating: true, genre: true, _id: true});
    if (!movies) return res.status(404).send("Movie not found");
    res.send(movies);
  } catch (error) {
    res.status(500).send("Server error");
  }
}

// Récupération de liste des films filtrées  POST
export async function listFiltre(req, res) {
  try {
    const { name, director, genre, description, releaseDate, ageRating } = req.body;
    let filter = {};
    
    
    if (name) {
      const rx = new RegExp(name, "i");
      filter.name = rx
    };
    if (director) {
      const rx = new RegExp(director, "i");
      filter.director = rx
    };
    if (genre) {
      const rx = new RegExp(genre, "i");
      filter.genre = rx
    };
    if (description) {
      const rx = new RegExp(description, "i");
      filter.description = rx
    };
    if (releaseDate) {
      const rx = new RegExp(releaseDate, "i");
      filter.releaseDate = rx
    };
    if (ageRating) {
      const rx = new RegExp(ageRating, "i");
      filter.ageRating = rx
    };
    //console.log(filter.name);

    let movies = await Movie.find(filter, {name: true, ageRating: true, genre: true, _id: true});
    if (movies) return res.send(movies);
    else res.status(404).send("Il n'y a pas de films du genre")
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

// Récupération d'un film
export async function getMovie(req, res) {
  try {
    const movie = await Movie.findById(req.params.id, {_id:false, __v:false}).select("name director genre description releaseDate ageRating");
    if (!movie) return res.status(404).send("Movie not found");
    res.send(movie);
  } catch (error) {
    //res.status(500).send(error);
    res.status(500).send("Server error");
  }
}

export async function movieEdit(req, res) {
  try {
      if (req.user.role.toString() === "admin")
        {
          const { name, director, genre, description, releaseDate, ageRating } = req.body;
          let movie = await Movie.findById(req.params.id);
          if (!movie) return res.status(404).send("Movie not found.");
          if(name) movie.name = name;
          if(director) movie.director = director;
          if(genre) movie.genre = genre;
          if(description) movie.description = description;
          if(releaseDate) movie.releaseDate = releaseDate;
          if(ageRating) movie.ageRating = ageRating;
          await movie.save();
          res.status(201).send("Movie succesfully edited");
        }else{
          res.status(401).send("You must be admin to do this!");
        }
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
}

export async function movieDel(req, res) {
  try {
    if (req.user.role.toString() === "admin"){
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).send("Movie not found");
      await movie.deleteOne();
      res.send("Movie deleted successfully!");
    }
    //res.header("x-auth-token", token).send("Deletion successful");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}