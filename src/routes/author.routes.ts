import { Router } from "express";
import { createAuthor, getAllAuthors, getAuthorById, getBooksByAuthor } from "../controllers/author.controller";

const router = Router()

router.route('/').get(getAllAuthors)

router.route('/:id').get(getAuthorById)

router.route('/create').post(createAuthor)

router.route('/:id/books').get(getBooksByAuthor)

export default router;