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

  static async add(req) {
    try {
      const newComic = await Comic.create(req.body)

      return this.return(true, 'added Comic data', newComic)
    } catch (error) {
      return this.return(false, 'Error adding Comic', error)
    }
  }

  static async delete(id) {
    try {
      await Comic.destroy({ where: { id } })
      return this.return(true, 'Comic deleted successfully')
    } catch (error) {
      return this.return(false, 'Error deleting Comic', error)
    }
  }

  static async update(req) {
    try {
      const id = req.params?.id
      const allComicData = req.body || {}

      await Comic.update(allComicData, { where: { id } })
      const comic = await Comic.findByPk(id)

      return this.return(true, 'Updated comic data', comic)
    } catch (error) {
      console.log(error)
      return this.return(false, 'Error updating comic', error)
    }
  }
}
