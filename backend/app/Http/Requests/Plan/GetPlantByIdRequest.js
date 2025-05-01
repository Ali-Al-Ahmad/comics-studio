import { param } from 'express-validator'
import { Plan } from '../../../Models/index.js'

export const PlanByIdRequest = [
  param('id')
    .isInt()
    .withMessage('Invalid Id')
    .bail()
    .custom(async (id) => {
      const exists = await Plan.findByPk(id)
      if (!exists) {
        throw new Error('Plan id not found')
      }
    }),
]
