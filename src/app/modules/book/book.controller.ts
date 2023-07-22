import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { bookService } from "./book.service";
import httpStatus from "http-status";


const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const { searchTerm, genre, publicationYear }: {limit?:string |undefined ,searchTerm?: string  , genre?: string, publicationYear?: string } = req.query;
  console.log('requer', genre);
  const books = await bookService.getAllBooks(searchTerm , genre , publicationYear );
  res.status(200).json({
    status: "success",
    statusCode: httpStatus.ok,
    success: true,
    data: books,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) =>{
  const _id = req.params.id;
  const result = await bookService.getSingleBook(_id)
  res.status(200).json({
    status: "success",
    statusCode: httpStatus.ok,
    success: true,
    data: result,
  });

})

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...book } = req.body;
  const result = await bookService.createBook(book);
  res.status(200).json({
    status: "success",
    statusCode: httpStatus.ok,
    success: true,
    data: result,
  });
});

const postReview = catchAsync(async(req: Request, res: Response)=>{
  const bookId = req.params.id;
  const { rating, comment } = req.body;
  const result = await bookService.postReview(bookId, {rating, comment})
  res.status(200).json({
    statusCode :httpStatus.ok,
    status:'success',
    data: result
  })
})



const updateBook = catchAsync(async (req: Request, res: Response) => {
    const _id = req.params.id;
    const updatedData = req.body.updatedBook;
      const result = await bookService.updateBook(_id, updatedData);
      console.log('book controller result ', result);
      res.status(200).json({
          data:result
      })
  });

//delete book
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const _id = req.params.id;
  const email = req.body.email;
  const result = await bookService.deleteBook(_id, email);
  res.status(200).json({
    data: result,
  });
});

export const bookcontroller = {
  getAllBooks,
  getSingleBook,
  createBook,
  deleteBook,
  updateBook,
  postReview
};
