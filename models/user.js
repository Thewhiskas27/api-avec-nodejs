import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role: {type: String, default: "user"},
  favorites: {type: Array},
  watchLater: {type: Array},
  watched: {type: Array},
  watching: {type: Array}
});

const User = model("User", userSchema);
export default User;