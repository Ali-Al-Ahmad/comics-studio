import { body } from 'express-validator'
import { User } from '../../../Models/index.js'

export const RegisterRequest = [
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('email')
    .isEmail()
    .withMessage('Invalid email')
    .custom(async (email) => {
      const exists = await User.findOne({ where: { email } })
      if (exists) {
        throw new Error('Email already in use')
      }
    }),
  body('password').isLength({ min: 6 }).withMessage('Password too short'),
]
