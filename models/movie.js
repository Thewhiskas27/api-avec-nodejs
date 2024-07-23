import { Schema, model } from "mongoose";

const movieSchema = new Schema({
  name: { type: String, required: true }, // nom
  director: { type: String, required: true }, // nom
  genre: { type: String, required: true, unique: false }, // genre
  description: { type: String, required: true }, 
  releaseDate: { type: Date, default: Date.now },
  ageRating: { type: Number, default: 0 },
});

const Movie = model("Movie", movieSchema);
export default Movie;