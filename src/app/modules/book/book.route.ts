import { Router } from "express";
import { bookcontroller } from "./book.controller";


const router = Router();

router.post('/reviews/:id', bookcontroller.postReview);
router.post('/create-book', bookcontroller.createBook);
router.get('/', bookcontroller.getAllBooks);
router.get('/book/:id', bookcontroller.getSingleBook);
router.patch('/:id', bookcontroller.updateBook);
router.delete('/delete/:id', bookcontroller.deleteBook);

export const bookRoutes = router;