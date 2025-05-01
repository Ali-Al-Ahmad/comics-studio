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
}
