import mongoose, { Schema } from "mongoose";
import { IBook } from "./book.interface";

const ReviewSchema: Schema = new Schema({
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  });
  
  const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publication_date: { type: Date, required: true },
    image_url: { type: String, required: true },
    reviews: [ReviewSchema],
  });
  
  const Book = mongoose.model<IBook>('Book', BookSchema);
  
  export default Book;