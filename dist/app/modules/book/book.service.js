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
exports.bookService = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const getAllBooks = (searchTerm, genre, publicationYear) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
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
    const result = yield book_model_1.default.find(filter).sort({ createdAt: -1 });
    return result;
});
// get single book
const getSingleBook = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.findById({ _id });
    return result;
});
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.create(book);
    return book;
});
//update book
const updateBook = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.default.findOne({ _id });
    if (!isExist) {
        throw new Error("Book not found !");
    }
    const bookData = __rest(payload, []);
    const updatedBookData = Object.assign({}, bookData);
    const result = yield book_model_1.default.findOneAndUpdate({ _id }, updatedBookData, {
        new: true,
    });
    return result;
});
// delete book
const deleteBook = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.default.findOne({ _id });
    if (!isExist) {
        throw new Error("Book is not found !");
    }
    const result = yield book_model_1.default.deleteOne({ _id });
    return result;
});
exports.bookService = {
    getAllBooks,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook,
};
