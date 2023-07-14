import { IBook } from "./book.interface";
import Book from "./book.model";

const getAllBooks = async () => {
  const result = await Book.find({});
  return result;
};

const createBook = async (book: IBook): Promise<IBook | null> => {
  const result = await Book.create(book);
  return book;
};
export const bookService = {
  getAllBooks,
  createBook,
};
