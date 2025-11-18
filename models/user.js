import mongoose, { Schema } from "mongoose";
import { sheetSchema } from "./sheet.js";

export const userSchema = new Schema({
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  senha: String,
  sheets: [sheetSchema],
});

export const User = mongoose.model("User", userSchema);
