import mongoose, { Schema } from "mongoose";
import { sheetSchema } from "./sheet.js";

export const userSchema = new Schema({
  username: String,
  email: String,
  senha: String,
  sheets: [sheetSchema],
});

export const User = mongoose.model("User", userSchema);
