import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { bookService } from "./book.service";
import httpStatus from "http-status";


const getAllBooks = catchAsync(async (req: Request, res: Response) => {

  const { searchTerm, genre, publicationYear }: { searchTerm?: string  , genre?: string, publicationYear?: number } = req.query;
  console.log('search term', searchTerm);
  console.log('genre', genre);
  console.log('publicationYear',publicationYear);
  const books = await bookService.getAllBooks(searchTerm , genre , publicationYear );
  res.status(200).json({
    status: "success",
    statusCode: 200,
    success: true,
    data: books,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) =>{
  const _id = req.params.id;
  console.log(_id);
  const result = await bookService.getSingleBook(_id)
  res.status(200).json({
    status: "success",
    statusCode: 200,
    success: true,
    data: result,
  });

})

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...book } = req.body;
  const result = await bookService.createBook(book);
  res.status(200).json({
    status: "success",
    statusCode: 200,
    success: true,
    data: result,
  });
});

//update book

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
    const _id = req.params.id;
    const updatedData = req.body;
    const result = await bookService.updateBook(_id, updatedData);
    res.status(200).json({
        statuscode: 200,
        status : "success",
        success:true,
        data:result
    })
  });

//delete book
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const _id = req.params.id;
  const result = await bookService.deleteBook(_id);
  res.status(200).json({
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully !",
    data: result,
  });
});

export const bookcontroller = {
  getAllBooks,
  getSingleBook,
  createBook,
  deleteBook,
  updateFaculty
};
