import { body } from 'express-validator'

export const GenerateComicRequest = [
  body('user_prompt').notEmpty().withMessage('User prompt is required'),
  body('character_image').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('Character image file is required')
    }
    return true
  }),
]
