import { body, param } from 'express-validator'
import { Comic } from '../../../Models/index.js'

export const UpdateComicRequest = [
  param('id')
    .isInt()
    .withMessage('Invalid Comic ID')
    .bail()
    .custom(async (id) => {
      const exists = await Comic.findByPk(id)
      if (!exists) throw new Error('Comic not found')
    }),

  body('caption').optional().notEmpty().withMessage('caption is required'),
  body('image_url').optional().notEmpty().withMessage('image_url is required'),
]
