import Controller from './Controller.js'
import CharacterService from '../../Services/CharacterService.js'

class CharacterController extends Controller {
  static async getAllCharacters(req, res) {
    try {
      const result = await CharacterService.all()
      return CharacterController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return CharacterController.returnResponse(
        res,
        false,
        'Error in All Characters Controller',
        error
      )
    }
  }
}

export default CharacterController
