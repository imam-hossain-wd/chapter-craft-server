import { Router } from "express";
import { bookcontroller } from "./book.controller";


const router = Router();

router.get('/', bookcontroller.getAllBooks);

export const bookRoutes = router;