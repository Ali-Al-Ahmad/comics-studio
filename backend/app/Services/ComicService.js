import Service from './Service.js'
import { Comic } from '../Models/index.js'

export default class ComicService extends Service {
  static async all() {
    try {
      const all_comics = await Comic.findAll({
        order: [['id', 'DESC']],
      })
      return this.return(true, 'All comics', all_comics)
    } catch (error) {
      return this.return(false, 'Error getting all comics', error)
    }
  }

  static async byId(id) {
    try {
      const comicData = await Comic.findByPk(id)
      return this.return(true, 'Comic retrieved successfully', comicData)
    } catch (error) {
      return this.return(false, 'Error getting Comic by ID', error)
    }
  }
}
