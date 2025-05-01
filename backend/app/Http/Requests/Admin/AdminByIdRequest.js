import { param } from 'express-validator'
import { Admin } from '../../../Models/index.js'

export const AdminByIdRequest = [
  param('id')
    .isInt()
    .withMessage('Invalid Id')
    .bail()
    .custom(async (id) => {
      const exists = await Admin.findByPk(id)
      if (!exists) {
        throw new Error('Admin id not found')
      }
    }),
]
