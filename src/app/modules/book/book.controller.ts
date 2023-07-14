import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { bookService } from "./book.service";



const getAllBooks = catchAsync(async(req:Request, res:Response)=>{
    const books = await bookService.getAllBooks();
    res.status(200).json({
        status:"success",
        statusCode:200,
        success: true,
        data: books
    })
})
const createBook = catchAsync(async(req:Request, res:Response)=>{
    const {...book} = req.body;
    const result = await bookService.createBook(book);
    res.status(200).json({
        status:"success",
        statusCode:200,
        success: true,
        data: result
    })
})


export const bookcontroller = {
    getAllBooks,
    createBook
}