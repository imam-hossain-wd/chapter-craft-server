import { Router } from "express";
import { bookcontroller } from "./book.controller";


const router = Router();

router.post('/create-book', bookcontroller.createBook);
router.get('/', bookcontroller.getAllBooks);
router.delete('/:id', bookcontroller.deleteBook);

export const bookRoutes = router;