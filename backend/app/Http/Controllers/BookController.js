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
}

export default BookController
