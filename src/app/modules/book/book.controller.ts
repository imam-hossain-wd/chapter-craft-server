import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { bookService } from "./book.service";
import httpStatus from "http-status";

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const books = await bookService.getAllBooks();
  res.status(200).json({
    status: "success",
    statusCode: 200,
    success: true,
    data: books,
  });
});
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
  createBook,
  deleteBook,
};
