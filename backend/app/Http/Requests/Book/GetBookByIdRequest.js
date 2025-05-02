import { param } from 'express-validator'
import { Book } from '../../../Models/index.js'

export const BookByIdRequest = [
  param('id')
    .isInt()
    .withMessage('Invalid Id')
    .bail()
    .custom(async (id) => {
      const exists = await Book.findByPk(id)
      if (!exists) {
        throw new Error('Book id not found')
      }
    }),
]
