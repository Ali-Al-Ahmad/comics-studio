import { body } from 'express-validator'

export const AddComicRequest = [
  body('caption').notEmpty().withMessage('caption is required'),
  body('image_url').notEmpty().withMessage('image_url is required'),
]
