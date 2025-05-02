import { body } from 'express-validator'
import { Book } from '../../../Models/index.js'

export const AddBookRequest = [
  body('title')
    .notEmpty()
    .withMessage('Invalid title')
    .bail()
    .custom(async (title, { req }) => {
      const user_id = req.user?.id
      if (!user_id) {
        throw new Error('User ID is required to validate Book title')
      }

      const exists = await Book.findOne({
        where: { title, user_id },
      })

      if (exists) {
        throw new Error('Book title already exists for this user')
      }
    }),
  body('image_url').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('Image file is required')
    }
    return true
  }),
]
