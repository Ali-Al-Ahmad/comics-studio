import { body } from 'express-validator'
import { Plan } from '../../../Models/index.js'

export const AddPlanRequest = [
  body('name')
    .notEmpty()
    .withMessage('Invalid name')
    .custom(async (name) => {
      const exists = await Plan.findOne({ where: { name } })
      if (exists) {
        throw new Error('plan name already exist')
      }
    }),
  body('price').notEmpty().withMessage('price is required'),
  body('credits').notEmpty().withMessage('name is required'),
]
