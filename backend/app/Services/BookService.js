import Service from './Service.js'
import { Book } from '../Models/index.js'

export default class BookService extends Service {
  static async all() {
    try {
      const all_books = await Book.findAll({
        order: [['id', 'DESC']],
      })
      return this.return(true, 'All comic books', all_books)
    } catch (error) {
      return this.return(false, 'Error getting all comic books', error)
    }
  }
}
