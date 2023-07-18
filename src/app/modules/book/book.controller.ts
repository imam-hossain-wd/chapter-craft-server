import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { bookService } from "./book.service";
import httpStatus from "http-status";


const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  console.log('qqqqqqqqqq',req.query);

  const {limit, searchTerm, genre, publicationYear }: {limit?:number |undefined ,searchTerm?: string  , genre?: string, publicationYear?: number } = req.query;
  const books = await bookService.getAllBooks(limit,searchTerm , genre , publicationYear );
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
  console.log(req.body);
  const result = await bookService.createBook(book);
  res.status(200).json({
    status: "success",
    statusCode: 200,
    success: true,
    data: result,
  });
});

const postReview = catchAsync(async(req: Request, res: Response)=>{
  const bookId = req.params.id;
  const { rating, comment } = req.body;
  const result = await bookService.postReview(bookId, {rating, comment})
  res.status(200).json({
    statusCode : 200,
    status:'success',
    data: result
  })
})



const updateBook = catchAsync(async (req: Request, res: Response) => {
    const _id = req.params.id;
    const updatedData = req.body.updatedBook;
    const commentData = req.body.commentData
    if(updatedData){
      const result = await bookService.updateBook(_id, updatedData);
      console.log(result);
      res.status(200).json({
          statuscode: 200,
          status : "success",
          success:true,
          data:result
      })
    }
    if(commentData){
      const result = await bookService.updateBook(_id, commentData);
      console.log(result);
      res.status(200).json({
          statuscode: 200,
          status : "success",
          success:true,
          data:result
      })
    }
   
  });

//delete book
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const _id = req.params.id;
  console.log('delete controller clicked');
  console.log('params id', _id);
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
  updateBook,
  postReview
};
