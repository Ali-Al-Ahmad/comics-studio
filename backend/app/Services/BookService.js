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

  static async byId(id) {
    try {
      const bookData = await Book.findByPk(id)
      return this.return(true, 'Book retrieved successfully', bookData)
    } catch (error) {
      return this.return(false, 'Error getting Book by ID', error)
    }
  }

  static async add(req) {
    try {
      const newBook = await Book.create({
        ...req.body,
        image_url: req.file.path,
        user_id: req.user?.id,
      })

      return this.return(true, 'added Book data', newBook)
    } catch (error) {
      return this.return(false, 'Error adding Book', error)
    }
  }

  static async delete(id) {
    try {
      await Book.destroy({ where: { id } })
      return this.return(true, 'Book deleted successfully')
    } catch (error) {
      return this.return(false, 'Error deleting Book', error)
    }
  }

  static async update(req) {
    try {
      const id = req.params?.id
      const allBookData = req.body || {}
      const path = req.file?.path

      if (path) {
        allBookData.image_url = path
      }

      await Book.update(allBookData, { where: { id } })
      const book = await Book.findByPk(id)

      return this.return(true, 'Updated book data', book)
    } catch (error) {
      console.log(error)
      return this.return(false, 'Error updating book', error)
    }
  }

  static async allPublicBooks() {
    try {
      const public_books = await Book.findAll({
        where: { is_public: true },
        order: [['id', 'DESC']],
      })
      return this.return(true, 'All public comic books', public_books)
    } catch (error) {
      return this.return(false, 'Error getting all public comic books', error)
    }
  }
}
