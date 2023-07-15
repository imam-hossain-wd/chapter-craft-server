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

//update book

const updateBook = async (
  _id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id });

  if (!isExist) {
    throw new Error("Book not found !");
  }
  const { ...bookData } = payload;
  const updatedBookData: Partial<IBook> = { ...bookData };

  const result = await Book.findOneAndUpdate({ _id }, updatedBookData, {
    new: true,
  });
  return result;
};

// delete book
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
  updateBook,
  deleteBook,
};
