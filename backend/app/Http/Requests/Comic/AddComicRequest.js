import { body } from 'express-validator'
import { Book } from '../../../Models/index.js'

export const AddComicRequest = [
  body('caption').notEmpty().withMessage('caption is required'),
  body('image_url').notEmpty().withMessage('image_url is required'),
  body('book_id')
    .notEmpty()
    .withMessage('book_id is required')
    .bail()
    .custom(async (book_id, { req }) => {
      const exists = await Book.findByPk(book_id)
      if (!exists) {
        throw new Error('Book not found')
      }
    }),
]
