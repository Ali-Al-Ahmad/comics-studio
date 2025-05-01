import { body } from 'express-validator'
import { Character } from '../../../Models/index.js'

export const AddCharacterRequest = [
  body('name')
    .notEmpty()
    .withMessage('Invalid name')
    .bail()
    .custom(async (name, { req }) => {
      const user_id = req.user?.id || req.body.user_id
      if (!user_id) {
        throw new Error('User ID is required to validate character name')
      }

      const exists = await Character.findOne({
        where: { name, user_id },
      })

      if (exists) {
        throw new Error('Character name already exists for this user')
      }
    }),
  body('description').notEmpty().withMessage('Description is required'),
  body('image_url').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('Image file is required')
    }
    return true
  }),
]
