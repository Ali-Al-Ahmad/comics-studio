import express from 'express'

import BookController from '../app/Http/Controllers/BookController.js'
import { validateRequest } from '../app/Middlewares/validateRequest.js'
import { AddBookRequest } from '../app/Http/Requests/Book/AddBookRequest.js'
import { BookByIdRequest } from '../app/Http/Requests/Book/GetBookByIdRequest.js'
import { UpdateBookRequest } from '../app/Http/Requests/Book/BookUpdateRequest.js'
import upload from '../app/Middlewares/uploadWithMulter.js'

const router = express.Router()

router.get('/', BookController.getAllBooks)

router.get('/publicbooks', BookController.getAllPublicBooks)

router.get('/bookcomics/:id', BookByIdRequest, BookController.getBookComics)

router.get('/:id', BookByIdRequest, validateRequest, BookController.getBookById)

router.post(
  '/',
  upload.single('image_url'),
  AddBookRequest,
  validateRequest,
  BookController.addBook
)

router.put(
  '/:id',
  upload.single('image_url'),
  UpdateBookRequest,
  validateRequest,
  BookController.updateBook
)

router.delete(
  '/:id',
  BookByIdRequest,
  validateRequest,
  BookController.deleteBook
)

export default router
