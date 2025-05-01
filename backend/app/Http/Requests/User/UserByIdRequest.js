import { param } from 'express-validator'
import { User } from '../../../Models/index.js'

export const UserByIdRequest = [
  param('id')
    .isInt()
    .withMessage('Invalid Id')
    .bail()
    .custom(async (id) => {
      const exists = await User.findByPk(id)
      if (!exists) {
        throw new Error('User id not found')
      }
    }),
]
