import { body, param } from 'express-validator'
import { User } from '../../../Models/index.js'
import { Op } from 'sequelize'

export const UpdateUserRequest = [
  param('id')
    .isInt()
    .withMessage('Invalid user ID')
    .bail()
    .custom(async (id) => {
      const exists = await User.findByPk(id)
      if (!exists) throw new Error('User not found')
    }),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email')
    .bail()
    .custom(async (email, { req }) => {
      const exists = await User.findOne({
        where: {
          email,
          id: { [Op.ne]: req.params.id }, // Exclude current user
        },
      })
      if (exists) {
        throw new Error('Email already in use by another user')
      }
    }),
  body('first_name')
    .optional()
    .notEmpty()
    .withMessage('First name is required'),

  body('last_name').optional().notEmpty().withMessage('Last name is required'),

  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phone')
    .optional()
    .isLength({ min: 8 })
    .withMessage('phone must be at least 8 characters long'),
]
