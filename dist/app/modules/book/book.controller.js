"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookcontroller = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const book_service_1 = require("./book.service");
const http_status_1 = __importDefault(require("http-status"));
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, genre, publicationYear } = req.query;
    console.log('search term', searchTerm);
    console.log('genre', genre);
    console.log('publicationYear', publicationYear);
    const books = yield book_service_1.bookService.getAllBooks(searchTerm, genre, publicationYear);
    res.status(200).json({
        status: "success",
        statusCode: 200,
        success: true,
        data: books,
    });
}));
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    console.log(_id);
    const result = yield book_service_1.bookService.getSingleBook(_id);
    res.status(200).json({
        status: "success",
        statusCode: 200,
        success: true,
        data: result,
    });
}));
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = __rest(req.body, []);
    const result = yield book_service_1.bookService.createBook(book);
    res.status(200).json({
        status: "success",
        statusCode: 200,
        success: true,
        data: result,
    });
}));
//update book
const updateFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const updatedData = req.body;
    const result = yield book_service_1.bookService.updateBook(_id, updatedData);
    res.status(200).json({
        statuscode: 200,
        status: "success",
        success: true,
        data: result
    });
}));
//delete book
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const result = yield book_service_1.bookService.deleteBook(_id);
    res.status(200).json({
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book deleted successfully !",
        data: result,
    });
}));
exports.bookcontroller = {
    getAllBooks,
    getSingleBook,
    createBook,
    deleteBook,
    updateFaculty
};
