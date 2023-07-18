import { IBook } from "./book.interface";
import Book from "./book.model";

const getAllBooks = async (limit?:number | undefined,searchTerm?: string, genre?: string, publicationYear?:number) => {
  const filter: any = {};

  if (searchTerm) {
    const searchRegex = new RegExp(searchTerm, 'i');
    filter.$or = [
      { title: searchRegex },
      { author: searchRegex },
      { genre: searchRegex },
    ];
  }

  if (genre) {
    filter.genre = genre;
  }

  if (publicationYear) {
    const publicationYearStart = new Date(publicationYear, 0, 1);
    const publicationYearEnd = new Date(publicationYear, 11, 31);
    filter.publication_date = {
      $gte: publicationYearStart,
      $lte: publicationYearEnd,
    };
  }

  const result = await Book.find(filter).sort({ createdAt: -1 }).limit(limit);
  return result;
};

// get single book

const getSingleBook = async (_id:string)=> {
  const result = await Book.findById({_id})
  return result;
}


const createBook = async (book: IBook): Promise<IBook | null> => {
  const result = await Book.create(book);
  return book;
};

//update book

const updateBook = async (
  _id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  console.log('serviced....',payload);
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
  rating:number;
  comment:string
}

const postReview = async (id:string,payload:reviews )=> {
  const isBookExit = await Book.findById(id);
  if(!isBookExit){
    throw new Error("Book is not exits")
  }
  const result = await  Book.findByIdAndUpdate(
    id,
    { $push: { reviews: payload } },
    { new: true }
  );

  return result;
}

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
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
  postReview
};
