import { Router } from 'express'
import { createBook, getAllBooks, getBookById, updateBook } from '../controllers/book.controller';

const router = Router()

router.route('/').get(getAllBooks)

router.route('/:id').get(getBookById)

router.route('/create').post(createBook)

router.route('/:id/update').patch(updateBook)

export default router;