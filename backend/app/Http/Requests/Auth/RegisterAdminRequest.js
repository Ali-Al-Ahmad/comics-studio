import { body } from 'express-validator'
import { Admin } from '../../../Models/index.js'

export const RegisterAdminRequest = [

  body('email')
    .isEmail()
    .withMessage('Invalid email')
    .custom(async (email) => {
      const exists = await Admin.findOne({ where: { email } })
      if (exists) {
        throw new Error('Email already in use')
      }
    }),
  body('password').isLength({ min: 6 }).withMessage('Password too short'),
]
