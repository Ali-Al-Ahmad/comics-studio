import { param } from 'express-validator'
import { Comic } from '../../../Models/index.js'

export const ComicByIdRequest = [
  param('id')
    .isInt()
    .withMessage('Invalid Id')
    .bail()
    .custom(async (id) => {
      const exists = await Comic.findByPk(id)
      if (!exists) {
        throw new Error('Comic id not found')
      }
    }),
]
