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
      return this.return(false, 'Error getting all characters', error)
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
      return this.return(false, 'Error getting Character by ID', error)
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
      return this.return(false, 'Error adding Character', error)
    }
  }

  static async delete(id) {
    try {
      await Character.destroy({ where: { id } })
      return this.return(true, 'Character deleted successfully')
    } catch (error) {
      return this.return(false, 'Error deleting Character', error)
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
      return this.return(false, 'Error updating Character', error)
    }
  }
}
