import { body, param } from 'express-validator'
import { Character } from '../../../Models/index.js'

export const UpdateCharacterRequest = [
  param('id').isInt().withMessage('Invalid character ID'),

  body('name')
    .optional()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .bail()
    .custom(async (name, { req }) => {
      const user_id = req.user?.id || req.body.user_id
      const characterId = parseInt(req.params.id)

      if (!user_id) {
        throw new Error('User ID is required')
      }

      const exists = await Character.findOne({
        where: {
          name,
          user_id,
          id: { [Op.ne]: characterId }, // exclude the current character
        },
      })

      if (exists) {
        throw new Error(
          'Another character with this name already exists for this user'
        )
      }
    }),

  body('description')
    .optional()
    .notEmpty()
    .withMessage('Description cannot be empty'),

  body('image_url').custom((value, { req }) => {
    if (!req.file && !req.body.image_url) {
      throw new Error('Image file or URL is required')
    }
    return true
  }),
]
