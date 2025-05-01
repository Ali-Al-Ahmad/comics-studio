import { body, param } from 'express-validator'
import { Admin } from '../../../Models/index.js'
import { Op } from 'sequelize'

export const UpdateAdminRequest = [
  param('id')
    .isInt()
    .withMessage('Invalid admin ID')
    .bail()
    .custom(async (id) => {
      const exists = await Admin.findByPk(id)
      if (!exists) throw new Error('Admin not found')
    }),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email')
    .bail()
    .custom(async (email, { req }) => {
      const exists = await Admin.findOne({
        where: {
          email,
          id: { [Op.ne]: req.params.id }, // Exclude current Admin
        },
      })
      if (exists) {
        throw new Error('Email already in use by another admin')
      }
    }),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
]
