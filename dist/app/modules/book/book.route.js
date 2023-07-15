"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
const router = (0, express_1.Router)();
router.post('/create-book', book_controller_1.bookcontroller.createBook);
router.get('/', book_controller_1.bookcontroller.getAllBooks);
router.patch('/:id', book_controller_1.bookcontroller.updateFaculty);
router.delete('/:id', book_controller_1.bookcontroller.deleteBook);
exports.bookRoutes = router;