import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unqiue: true,
  },
  password: {
    type: String,
    require: true,
    unqiue: true,
  },
});

export const user = mongoose.model("User", userSchema);
