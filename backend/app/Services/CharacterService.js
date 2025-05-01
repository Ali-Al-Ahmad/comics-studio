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
      return this.return(true, 'Character retrieved successfully', characterData)
    } catch (error) {
      return this.return(false, 'Error getting Character by ID', error)
    }
  }
}
