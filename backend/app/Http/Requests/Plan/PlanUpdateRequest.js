import { body, param } from 'express-validator'
import { Plan } from '../../../Models/index.js'
import { Op } from 'sequelize'

export const UpdatePlanRequest = [
  param('id')
    .isInt()
    .withMessage('Invalid plan ID')
    .bail()
    .custom(async (id) => {
      const exists = await Plan.findByPk(id)
      if (!exists) throw new Error('Plan not found')
    }),

  body('name')
    .optional()
    .notEmpty()
    .withMessage('name Required')
    .bail()
    .custom(async (name, { req }) => {
      const exists = await Plan.findOne({
        where: {
          name,
          id: { [Op.ne]: req.params.id },
        },
      })
      if (exists) {
        throw new Error('name already in use')
      }
    }),
]
