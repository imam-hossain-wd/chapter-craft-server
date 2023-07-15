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

const deleteBook = async (_id: string) => {

  const isExist = await Book.findOne({ _id });
  if (!isExist) {
    throw new Error("Book is not found !");
  }
  const result = await Book.deleteOne({ _id });
  return result;
};

export const bookService = {
  getAllBooks,
  createBook,
  deleteBook
};
