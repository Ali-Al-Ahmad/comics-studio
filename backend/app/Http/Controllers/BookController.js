import Controller from './Controller.js'
import BookService from '../../Services/BookService.js'

class BookController extends Controller {
  static async getAllBooks(req, res) {
    try {
      const result = await BookService.all()
      return BookController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return BookController.returnResponse(
        res,
        false,
        'Error in All Book Controller',
        error
      )
    }
  }

  static async getBookById(req, res) {
    try {
      const result = await BookService.byId(req.params.id)
      return BookController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return BookController.returnResponse(
        res,
        false,
        'Error in Book By Id Controller',
        error
      )
    }
  }

  static async addBook(req, res) {
    try {
      const result = await BookService.add(req)
      return BookController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return BookController.returnResponse(
        res,
        false,
        'Error in Add Book Controller',
        error
      )
    }
  }

  static async deleteBook(req, res) {
    try {
      const result = await BookService.delete(req.params.id)
      return BookController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return BookController.returnResponse(
        res,
        false,
        'Error in Delete Book Controller',
        error
      )
    }
  }

  static async updateBook(req, res) {
    try {
      const result = await BookService.update(req)
      return BookController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return BookController.returnResponse(
        res,
        false,
        'Error in Update Book Controller',
        error
      )
    }
  }

  static async getAllPublicBooks(req, res) {
    try {
      const result = await BookService.allPublicBooks()
      return BookController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return BookController.returnResponse(
        res,
        false,
        'Error in All public Book Controller',
        error
      )
    }
  }

  static async getBookComics(req, res) {
    try {
      const result = await BookService.bookComics(req.params.id)
      return BookController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return BookController.returnResponse(
        res,
        false,
        'Error in gettin all comics for a Book Controller',
        error
      )
    }
  }
}

export default BookController
