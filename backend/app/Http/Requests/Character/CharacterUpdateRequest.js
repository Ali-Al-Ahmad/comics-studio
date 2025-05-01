import { body, param } from 'express-validator'
import { Character } from '../../../Models/index.js'
import { Op } from 'sequelize'

export const UpdateCharacterRequest = [
  param('id')
    .isInt()
    .withMessage('Invalid Character ID')
    .bail()
    .custom(async (id) => {
      const exists = await Character.findByPk(id)
      if (!exists) throw new Error('Character not found')
    }),

  body('name')
    .optional()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .bail()
    .custom(async (name, { req }) => {
      const user_id = req.user?.id
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

  body('image_url')
    .optional()
    .custom((value, { req }) => {
      if (!req.file && !req.body.image_url) {
        throw new Error('Image file or URL is required')
      }
      return true
    }),
]
