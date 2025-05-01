import { param } from 'express-validator'
import { Character } from '../../../Models/index.js'

export const CharacterByIdRequest = [
  param('id')
    .isInt()
    .withMessage('Invalid Id')
    .bail()
    .custom(async (id) => {
      const exists = await Character.findByPk(id)
      if (!exists) {
        throw new Error('Character id not found')
      }
    }),
]
