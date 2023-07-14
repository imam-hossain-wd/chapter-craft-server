import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { bookService } from "./book.service";



const getAllBooks = catchAsync(async(req:Request, res:Response)=>{
    const books = await bookService.getAllBooks();
    res.status(2000).json({
        status:"success",
        statusCode:200,
        success: true,
        data: books
    })
})


export const bookcontroller = {
    getAllBooks
}