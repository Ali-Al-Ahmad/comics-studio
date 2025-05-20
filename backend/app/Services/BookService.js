import Service from './Service.js'
import { Book, Comic, User } from '../Models/index.js'

export default class BookService extends Service {
  static async all() {
    try {
      const all_books = await Book.findAll({
        order: [['id', 'DESC']],
      })
      return this.return(true, 'All comic books', all_books)
    } catch (error) {
      this.handleError(error, 'Error getting all comic books')
    }
  }
  static async byId(id) {
    try {
      const bookData = await Book.findByPk(id)
      return this.return(true, 'Book retrieved successfully', bookData)
    } catch (error) {
      this.handleError(error, 'Error getting Book by ID')
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
      this.handleError(error, 'Error adding Book')
    }
  }
  static async delete(id) {
    try {
      await Book.destroy({ where: { id } })
      return this.return(true, 'Book deleted successfully')
    } catch (error) {
      this.handleError(error, 'Error deleting Book')
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
      this.handleError(error, 'Error updating book')
    }
  }
  static async allPublicBooks() {
    try {
      const public_books = await Book.findAll({
        where: { is_public: true },
        order: [['id', 'DESC']],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'first_name', 'last_name', 'email'],
          },
        ],
      })
      return this.return(true, 'All public comic books', public_books)
    } catch (error) {
      this.handleError(error, 'Error getting all public comic books')
    }
  }
  static async bookComics(book_id) {
    try {
      const book = await Book.findByPk(book_id, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'first_name', 'last_name', 'email'],
          },
        ],
      })

      if (!book) {
        return this.return(false, 'Book not found', null)
      }

      const book_comics = await Comic.findAll({
        where: { book_id },
        order: [['id', 'ASC']],
      })

      return this.return(true, 'Book and comics data', {
        book: book,
        comics: book_comics,
      })
    } catch (error) {
      this.handleError(error, 'Error getting book comics')
    }
  }
}
