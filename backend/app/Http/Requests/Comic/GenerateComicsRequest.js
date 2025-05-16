import { body } from 'express-validator'

export const GenerateComicRequest = [
  body('user_prompt').notEmpty().withMessage('User prompt is required'),
]
