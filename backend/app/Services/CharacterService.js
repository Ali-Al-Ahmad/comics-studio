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

  static async add(data, path) {
    try {
      const newCharacter = await Character.create({ ...data, image_url: path })

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

  static async update(id, allCharacterData = {}, path = null) {
    try {
      if (path) {
        allCharacterData.image_url = path
      }
      await Character.update(allCharacterData, { where: { id } })
      const character = await Character.findByPk(id)

      return this.return(true, 'Updated Character data', character)
    } catch (error) {
      console.log(error)
      return this.return(false, 'Error updating Character', error)
    }
  }
}
