import { body } from 'express-validator'

export const LoginRequest = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password too short'),
]
