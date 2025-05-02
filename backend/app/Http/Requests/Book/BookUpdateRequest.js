import { body, param } from 'express-validator'
import { Book } from '../../../Models/index.js'
import { Op } from 'sequelize'

export const UpdateBookRequest = [
  param('id')
    .isInt()
    .withMessage('Invalid Book ID')
    .bail()
    .custom(async (id) => {
      const exists = await Book.findByPk(id)
      if (!exists) throw new Error('Book not found')
    }),

  body('title')
    .optional()
    .notEmpty()
    .withMessage('Titlle cannot be empty')
    .bail()
    .custom(async (title, { req }) => {
      const user_id = req.user?.id
      const bookId = parseInt(req.params.id)

      if (!user_id) {
        throw new Error('User ID is required')
      }

      const exists = await Book.findOne({
        where: {
          title,
          user_id,
          id: { [Op.ne]: bookId }, // exclude the current book
        },
      })

      if (exists) {
        throw new Error(
          'Another book with this title already exists for this user'
        )
      }
    }),
  body('image_url')
    .optional()
    .custom((value, { req }) => {
      if (!req.file && !req.body.image_url) {
        throw new Error('Image file or URL is required')
      }
      return true
    }),
]
