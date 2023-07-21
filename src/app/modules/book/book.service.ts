import httpStatus from "http-status";
import { IBook } from "./book.interface";
import Book from "./book.model";



const getAllBooks = async (
  searchTerm?: string,
  genre?: string,
  publicationYear?: string
) => {
  const filter: any = {};

  if (searchTerm) {
    const searchRegex = new RegExp(searchTerm, 'i');
    filter.$or = [
      { title: searchRegex },
      { author: searchRegex },
      { genre: searchRegex }
    ];
  }

  if (genre) {
    filter.genre = genre;
  }

  if (publicationYear) {
    const yearNumber = parseInt(publicationYear);
    if (!isNaN(yearNumber)) {
      const yearStart = new Date(yearNumber, 0, 1);
      const yearEnd = new Date(yearNumber, 11, 31, 23, 59, 59, 999);
      filter.publication_date = {
        $gte: yearStart,
        $lte: yearEnd,
      };
    } else {
      
    }
  }

  const result = await Book.find(filter).sort({ createdAt: -1 });
  return result;
};



// get single book

const getSingleBook = async (_id: string) => {
  const result = await Book.findById({ _id });
  return result;
};

const createBook = async (book: IBook): Promise<IBook | null> => {
  const result = await Book.create(book);
  return result
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

interface reviews {
  rating: number;
  comment: string;
}

const postReview = async (id: string, payload: reviews) => {
  const isBookExit = await Book.findById(id);
  if (!isBookExit) {
    throw new Error("Book is not exits");
  }
  const result = await Book.findByIdAndUpdate(
    id,
    { $push: { reviews: payload } },
    { new: true }
  );

  return result;
};

// delete book
const deleteBook = async (_id: string, email: string) => {
  const isExist = await Book.findOne({ _id });
  if (!isExist) {
    throw new Error("Book is not found !");
  }

  if (isExist && isExist.user_email === email) {
    const book = await Book.deleteOne({ _id });
    if (book) {
      const data = "Book deleted successfully";
      return data;
    }
  }
  const data = "You are unauthorize . cannot delete book !";
  return data;
};

export const bookService = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
  postReview,
};
