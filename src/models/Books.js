import { Schema, model } from "mongoose";
import { ReviewSchema } from "./Reviews.js";

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    reviews: [ReviewSchema],
  },
  { timestamps: true }
);

const Book = model("Book", BookSchema);

export default Book;
