import Controller from './Controller.js'
import ComicService from '../../Services/ComicService.js'

class ComicController extends Controller {
  static async getAllComics(req, res) {
    try {
      const result = await ComicService.all()
      return ComicController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return ComicController.returnResponse(
        res,
        false,
        'Error in All Comic Controller',
        error
      )
    }
  }

  static async getComicById(req, res) {
    try {
      const result = await ComicService.byId(req.params.id)
      return ComicController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return ComicController.returnResponse(
        res,
        false,
        'Error in Comic By Id Controller',
        error
      )
    }
  }
}

export default ComicController
