import Service from './Service.js'
import { Character } from '../Models/index.js'

export default class CharacterService extends Service {
  static async all() {
    try {
      const all_characters = await Character.findAll({
        order: [['id', 'DESC']],
      })
      return this.return(true, 'All characters', all_characters)
    } catch (error) {
      this.handleError(error, 'Error getting all characters')
    }
  }
  static async byId(id) {
    try {
      const characterData = await Character.findByPk(id)
      return this.return(
        true,
        'Character retrieved successfully',
        characterData
      )
    } catch (error) {
      this.handleError(error, 'Error getting Character by ID')
    }
  }
  static async add(req) {
    try {
      const newCharacter = await Character.create({
        ...req.body,
        image_url: req.file.path,
        user_id: req.user?.id,
      })

      return this.return(true, 'added Character data', newCharacter)
    } catch (error) {
      this.handleError(error, 'Error adding Character')
    }
  }
  static async delete(id) {
    try {
      await Character.destroy({ where: { id } })
      return this.return(true, 'Character deleted successfully')
    } catch (error) {
      this.handleError(error, 'Error deleting Character')
    }
  }
  static async update(req) {
    try {
      const id = req.params?.id
      const allCharacterData = req.body || {}
      const path = req.file?.path

      if (path) {
        allCharacterData.image_url = path
      }

      await Character.update(allCharacterData, { where: { id } })
      const character = await Character.findByPk(id)

      return this.return(true, 'Updated Character data', character)
    } catch (error) {
      this.handleError(error, 'Error updating Character')
    }
  }
  static async userCharacters(req) {
    try {
      const all_characters = await Character.findAll({
        order: [['id', 'DESC']],
        where: {
          user_id: req.user.id,
        },
      })
      return this.return(true, 'All user characters', all_characters)
    } catch (error) {
      this.handleError(error, 'Error getting all user characters')
    }
  }
  static async toggleFavorite(req) {
    try {
      const id = req.params?.id
      const { is_favorite } = req.body

      const character = await Character.findOne({
        where: {
          id,
          user_id: req.user.id,
        },
      })

      if (!character) {
        return this.return(
          false,
          'Character not found or you do not have permission'
        )
      }

      await Character.update({ is_favorite }, { where: { id } })

      const updatedCharacter = await Character.findByPk(id)

      return this.return(
        true,
        is_favorite
          ? 'Character added to favorites'
          : 'Character removed from favorites',
        updatedCharacter
      )
    } catch (error) {
      this.handleError(error, 'Error updating favorite status')
    }
  }
}
